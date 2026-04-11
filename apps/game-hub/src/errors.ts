import type {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import {
  type ApiErrorEnvelope,
  type SocketErrorMessage,
} from '@clocktower-nexus/protocol';
import { ZodError } from 'zod';

export type GameHubErrorCategory = 'validation' | 'transport' | 'internal';

export type GameHubErrorCode =
  | 'validation_error'
  | 'transport_error'
  | 'not_found'
  | 'internal_error';

export interface GameHubErrorOptions<TDetails = unknown> {
  readonly category: GameHubErrorCategory;
  readonly code: GameHubErrorCode;
  readonly message: string;
  readonly statusCode: number;
  readonly details?: TDetails;
  readonly cause?: unknown;
}

export type GameHubApiErrorEnvelope<TDetails = unknown> = ApiErrorEnvelope<
  GameHubErrorCode,
  TDetails
>;

export class GameHubError<TDetails = unknown> extends Error {
  readonly category: GameHubErrorCategory;
  readonly code: GameHubErrorCode;
  readonly statusCode: number;
  readonly details?: TDetails;

  constructor(options: GameHubErrorOptions<TDetails>) {
    super(options.message, {
      cause:
        options.cause instanceof Error || options.cause === undefined
          ? options.cause
          : undefined,
    });
    this.name = 'GameHubError';
    this.category = options.category;
    this.code = options.code;
    this.statusCode = options.statusCode;
    if (options.details !== undefined) {
      this.details = options.details;
    }
  }
}

type FastifyValidationError = FastifyError & {
  readonly validation: NonNullable<FastifyError['validation']>;
};

export function createGameHubError<TDetails = unknown>(
  options: GameHubErrorOptions<TDetails>,
): GameHubError<TDetails> {
  return new GameHubError(options);
}

export function isGameHubError(error: unknown): error is GameHubError {
  return error instanceof GameHubError;
}

export function toGameHubError(error: unknown): GameHubError {
  if (isGameHubError(error)) {
    return error;
  }

  if (error instanceof ZodError) {
    return createGameHubError({
      category: 'validation',
      code: 'validation_error',
      message: 'Request validation failed.',
      statusCode: 400,
      details: error.issues,
      cause: error,
    });
  }

  if (isFastifyValidationError(error)) {
    return createGameHubError({
      category: 'validation',
      code: 'validation_error',
      message: 'Request validation failed.',
      statusCode: 400,
      details: error.validation,
      cause: error,
    });
  }

  return createGameHubError({
    category: 'internal',
    code: 'internal_error',
    message: 'An internal server error occurred.',
    statusCode: 500,
    cause: error,
  });
}

export function toApiErrorEnvelope<TDetails = unknown>(
  error: GameHubError<TDetails>,
  requestId?: string,
): GameHubApiErrorEnvelope<TDetails> {
  return {
    ok: false,
    error: {
      code: error.code,
      message: error.message,
      ...(error.details !== undefined ? { details: error.details } : {}),
    },
    ...(requestId
      ? {
          meta: {
            requestId,
          },
        }
      : {}),
  };
}

export function toSocketErrorMessage<TDetails = unknown>(
  error: GameHubError<TDetails>,
  options: {
    readonly requestId?: string;
    readonly sessionId?: string;
    readonly currentRevision?: number;
    readonly recoverable?: boolean;
  } = {},
): SocketErrorMessage<GameHubErrorCode, TDetails> {
  return {
    type: 'socket_error',
    error: {
      code: error.code,
      message: error.message,
      ...(error.details !== undefined ? { details: error.details } : {}),
    },
    ...(options.requestId ? { requestId: options.requestId } : {}),
    ...(options.sessionId ? { sessionId: options.sessionId } : {}),
    ...(options.currentRevision !== undefined
      ? { currentRevision: options.currentRevision }
      : {}),
    ...(options.recoverable !== undefined
      ? { recoverable: options.recoverable }
      : {}),
  };
}

export async function registerGameHubErrorHandling(
  app: FastifyInstance,
): Promise<void> {
  app.setNotFoundHandler((request, reply) => {
    const notFoundError = createGameHubError({
      category: 'transport',
      code: 'not_found',
      message: 'Route not found.',
      statusCode: 404,
    });

    request.log.warn(
      {
        errorCode: notFoundError.code,
        errorCategory: notFoundError.category,
      },
      'Route not found',
    );

    void sendGameHubError(reply, request, notFoundError);
  });

  app.setErrorHandler((error, request, reply) => {
    const gameHubError = toGameHubError(error);
    const logPayload = {
      err: error,
      errorCode: gameHubError.code,
      errorCategory: gameHubError.category,
      statusCode: gameHubError.statusCode,
    };

    if (gameHubError.category === 'internal') {
      request.log.error(logPayload, 'Request failed with an internal error');
    } else {
      request.log.warn(logPayload, 'Request failed with a handled error');
    }

    void sendGameHubError(reply, request, gameHubError);
  });
}

function isFastifyValidationError(
  error: unknown,
): error is FastifyValidationError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'validation' in error &&
    error.validation !== undefined &&
    'statusCode' in error
  );
}

async function sendGameHubError(
  reply: FastifyReply,
  request: FastifyRequest,
  error: GameHubError,
): Promise<void> {
  await reply
    .code(error.statusCode)
    .send(toApiErrorEnvelope(error, request.id));
}
