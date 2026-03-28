import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import {
  connectMessageSchema,
  createProjectionUpdateMessageSchema,
  socketErrorMessageSchema,
  subscribeMessageSchema,
} from '../../websocket.js';

describe('WebSocket protocol schemas', () => {
  it('parses a valid connect message', () => {
    expect(
      connectMessageSchema.parse({
        type: 'connect',
        requestId: 'request-1',
        sessionId: 'session-1',
        audience: 'storyteller',
        lastKnownRevision: 3,
      }),
    ).toEqual({
      type: 'connect',
      requestId: 'request-1',
      sessionId: 'session-1',
      audience: 'storyteller',
      lastKnownRevision: 3,
    });
  });

  it('rejects a subscribe message with an invalid stream value', () => {
    expect(
      subscribeMessageSchema.safeParse({
        type: 'subscribe',
        sessionId: 'session-1',
        stream: 'spectator',
      }).success,
    ).toBe(false);
  });

  it('rejects a socket error message without a message', () => {
    expect(
      socketErrorMessageSchema.safeParse({
        type: 'socket_error',
        error: {
          code: 'invalid_subscription',
        },
      }).success,
    ).toBe(false);
  });

  it('validates a projection update using a caller-supplied projection schema', () => {
    const projectionUpdateSchema = createProjectionUpdateMessageSchema(
      z.object({
        phase: z.enum(['setup', 'day', 'night']),
      }),
      z.literal('public'),
    );

    expect(
      projectionUpdateSchema.parse({
        type: 'projection_update',
        sessionId: 'session-1',
        stream: 'public',
        revision: 4,
        projection: {
          phase: 'day',
        },
      }),
    ).toEqual({
      type: 'projection_update',
      sessionId: 'session-1',
      stream: 'public',
      revision: 4,
      projection: {
        phase: 'day',
      },
    });
  });
});
