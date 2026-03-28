import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import {
  createApiErrorEnvelopeSchema,
  createApiResponseEnvelopeSchema,
  createApiSuccessEnvelopeSchema,
} from '../../http.js';

describe('HTTP protocol schemas', () => {
  it('parses a success envelope built from a caller-supplied payload schema', () => {
    const successEnvelopeSchema = createApiSuccessEnvelopeSchema(
      z.object({
        sessionId: z.string(),
      }),
    );

    expect(
      successEnvelopeSchema.parse({
        ok: true,
        data: {
          sessionId: 'session-1',
        },
        meta: {
          requestId: 'request-1',
          revision: 2,
        },
      }),
    ).toEqual({
      ok: true,
      data: {
        sessionId: 'session-1',
      },
      meta: {
        requestId: 'request-1',
        revision: 2,
      },
    });
  });

  it('rejects an error envelope with an invalid revision', () => {
    const errorEnvelopeSchema = createApiErrorEnvelopeSchema();

    expect(
      errorEnvelopeSchema.safeParse({
        ok: false,
        error: {
          code: 'invalid_session',
          message: 'Session not found.',
        },
        meta: {
          revision: -1,
        },
      }).success,
    ).toBe(false);
  });

  it('creates a discriminated response envelope schema for mixed success and error payloads', () => {
    const responseEnvelopeSchema = createApiResponseEnvelopeSchema(
      z.object({
        ready: z.boolean(),
      }),
    );

    expect(
      responseEnvelopeSchema.safeParse({
        ok: false,
        error: {
          code: 'not_ready',
          message: 'The session is not ready yet.',
        },
      }).success,
    ).toBe(true);
  });
});
