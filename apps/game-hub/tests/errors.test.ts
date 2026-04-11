import { afterEach, describe, expect, it } from 'vitest';
import {
  createApiErrorEnvelopeSchema,
  socketErrorMessageSchema,
} from '@clocktower-nexus/protocol';

import { createGameHubError, toSocketErrorMessage } from '../src/errors.js';
import { buildGameHubApp } from '../src/app.js';

const startedApps: Array<Awaited<ReturnType<typeof buildGameHubApp>>> = [];

afterEach(async () => {
  await Promise.all(
    startedApps.splice(0).map(async (app) => {
      await app.close();
    }),
  );
});

describe('game hub error conventions', () => {
  it('maps a known transport error into the shared HTTP error envelope', async () => {
    const app = await buildGameHubApp({ logger: false });
    startedApps.push(app);

    app.get('/transport-error-example', async () => {
      throw createGameHubError({
        category: 'transport',
        code: 'transport_error',
        message: 'A transport error occurred.',
        statusCode: 400,
        details: {
          reason: 'example',
        },
      });
    });

    const response = await app.inject({
      method: 'GET',
      url: '/transport-error-example',
    });
    const payload = response.json();

    expect(response.statusCode).toBe(400);
    expect(payload).toMatchObject({
      ok: false,
      error: {
        code: 'transport_error',
        message: 'A transport error occurred.',
        details: {
          reason: 'example',
        },
      },
      meta: {
        requestId: expect.any(String),
      },
    });
    expect(createApiErrorEnvelopeSchema().safeParse(payload).success).toBe(
      true,
    );
  });

  it('maps Fastify validation failures into the shared HTTP error envelope', async () => {
    const app = await buildGameHubApp({ logger: false });
    startedApps.push(app);

    app.get(
      '/validation-error-example',
      {
        schema: {
          querystring: {
            type: 'object',
            required: ['name'],
            properties: {
              name: {
                type: 'string',
              },
            },
            additionalProperties: false,
          },
        },
      },
      async () => ({
        ok: true,
      }),
    );

    const response = await app.inject({
      method: 'GET',
      url: '/validation-error-example',
    });
    const payload = response.json();

    expect(response.statusCode).toBe(400);
    expect(payload).toMatchObject({
      ok: false,
      error: {
        code: 'validation_error',
        message: 'Request validation failed.',
      },
      meta: {
        requestId: expect.any(String),
      },
    });
    expect(createApiErrorEnvelopeSchema().safeParse(payload).success).toBe(
      true,
    );
  });

  it('maps unmatched routes into the shared HTTP error envelope', async () => {
    const app = await buildGameHubApp({ logger: false });
    startedApps.push(app);

    const response = await app.inject({
      method: 'GET',
      url: '/missing-route',
    });
    const payload = response.json();

    expect(response.statusCode).toBe(404);
    expect(payload).toEqual({
      ok: false,
      error: {
        code: 'not_found',
        message: 'Route not found.',
      },
      meta: {
        requestId: expect.any(String),
      },
    });
  });

  it('maps unexpected handler failures into a generic internal error envelope', async () => {
    const app = await buildGameHubApp({ logger: false });
    startedApps.push(app);

    app.get('/internal-error-example', async () => {
      throw new Error('Database crashed');
    });

    const response = await app.inject({
      method: 'GET',
      url: '/internal-error-example',
    });
    const payload = response.json();

    expect(response.statusCode).toBe(500);
    expect(payload).toEqual({
      ok: false,
      error: {
        code: 'internal_error',
        message: 'An internal server error occurred.',
      },
      meta: {
        requestId: expect.any(String),
      },
    });
  });

  it('creates a reusable socket error message from the canonical backend error model', () => {
    const socketError = toSocketErrorMessage(
      createGameHubError({
        category: 'transport',
        code: 'transport_error',
        message: 'Subscription required.',
        statusCode: 400,
      }),
      {
        requestId: 'request-1',
        sessionId: 'session-1',
        recoverable: true,
      },
    );

    expect(socketErrorMessageSchema.safeParse(socketError).success).toBe(true);
    expect(socketError).toEqual({
      type: 'socket_error',
      requestId: 'request-1',
      sessionId: 'session-1',
      recoverable: true,
      error: {
        code: 'transport_error',
        message: 'Subscription required.',
      },
    });
  });
});
