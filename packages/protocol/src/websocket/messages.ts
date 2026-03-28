import { z } from 'zod';

import { apiErrorSchema } from '../http/index.js';
import {
  requestIdSchema,
  revisionSchema,
  sessionIdSchema,
} from '../shared/index.js';
import {
  type ProjectionStream,
  projectionStreamSchema,
  socketAudienceSchema,
} from './stream-identifiers.js';

/**
 * Shared runtime schema for a websocket connect message.
 */
export const connectMessageSchema = z
  .object({
    type: z.literal('connect'),
    requestId: requestIdSchema.optional(),
    sessionId: sessionIdSchema,
    audience: socketAudienceSchema,
    lastKnownRevision: revisionSchema.optional(),
  })
  .strict();

/**
 * Client message for starting a websocket session context.
 */
export type ConnectMessage = z.infer<typeof connectMessageSchema>;

/**
 * Shared runtime schema for a websocket connected acknowledgement.
 */
export const connectedMessageSchema = z
  .object({
    type: z.literal('connected'),
    requestId: requestIdSchema.optional(),
    sessionId: sessionIdSchema,
    audience: socketAudienceSchema,
    currentRevision: revisionSchema.optional(),
  })
  .strict();

/**
 * Server acknowledgement for an accepted websocket connection.
 */
export type ConnectedMessage = z.infer<typeof connectedMessageSchema>;

/**
 * Shared runtime schema for a websocket subscribe message.
 */
export const subscribeMessageSchema = z
  .object({
    type: z.literal('subscribe'),
    requestId: requestIdSchema.optional(),
    sessionId: sessionIdSchema,
    stream: projectionStreamSchema,
    sinceRevision: revisionSchema.optional(),
  })
  .strict();

/**
 * Client message for subscribing to a projection stream.
 */
export type SubscribeMessage = z.infer<typeof subscribeMessageSchema>;

/**
 * Shared runtime schema for a websocket subscribed acknowledgement.
 */
export const subscribedMessageSchema = z
  .object({
    type: z.literal('subscribed'),
    requestId: requestIdSchema.optional(),
    sessionId: sessionIdSchema,
    stream: projectionStreamSchema,
    currentRevision: revisionSchema.optional(),
  })
  .strict();

/**
 * Server acknowledgement for an accepted projection subscription.
 */
export type SubscribedMessage = z.infer<typeof subscribedMessageSchema>;

/**
 * Creates a runtime schema for a full-snapshot projection update message.
 */
export function createProjectionUpdateMessageSchema<
  TProjectionSchema extends z.ZodTypeAny,
  TStreamSchema extends z.ZodTypeAny = typeof projectionStreamSchema,
>(
  projectionSchema: TProjectionSchema,
  streamSchema: TStreamSchema = projectionStreamSchema as unknown as TStreamSchema,
) {
  return z
    .object({
      type: z.literal('projection_update'),
      sessionId: sessionIdSchema,
      stream: streamSchema,
      revision: revisionSchema,
      projection: projectionSchema,
    })
    .strict();
}

/**
 * Server message containing a full projection snapshot for a subscribed stream.
 */
export interface ProjectionUpdateMessage<
  TProjection,
  TStream extends ProjectionStream = ProjectionStream,
> {
  readonly type: 'projection_update';
  readonly sessionId: string;
  readonly stream: TStream;
  readonly revision: number;
  readonly projection: TProjection;
}

/**
 * Shared runtime schema for a websocket error message.
 */
export const socketErrorMessageSchema = z
  .object({
    type: z.literal('socket_error'),
    requestId: requestIdSchema.optional(),
    error: apiErrorSchema,
    sessionId: sessionIdSchema.optional(),
    currentRevision: revisionSchema.optional(),
    recoverable: z.boolean().optional(),
  })
  .strict();

/**
 * Generic websocket error message sent from server to client.
 */
export type SocketErrorMessage<
  TCode extends string = string,
  TDetails = unknown,
> = Omit<z.infer<typeof socketErrorMessageSchema>, 'error'> & {
  readonly error: {
    readonly code: TCode;
    readonly message: string;
    readonly details?: TDetails;
  };
};

/**
 * Shared runtime schema for all client-to-server websocket messages.
 */
export const webSocketClientMessageSchema = z.union([
  connectMessageSchema,
  subscribeMessageSchema,
]);

/**
 * Shared client-to-server websocket message union.
 */
export type WebSocketClientMessage = z.infer<
  typeof webSocketClientMessageSchema
>;

/**
 * Creates a runtime schema for all server-to-client websocket messages.
 */
export function createWebSocketServerMessageSchema<
  TStorytellerProjectionSchema extends z.ZodTypeAny,
  TPublicProjectionSchema extends z.ZodTypeAny,
>(options: {
  readonly storytellerProjectionSchema: TStorytellerProjectionSchema;
  readonly publicProjectionSchema: TPublicProjectionSchema;
}) {
  return z.union([
    connectedMessageSchema,
    subscribedMessageSchema,
    createProjectionUpdateMessageSchema(
      options.storytellerProjectionSchema,
      z.literal('storyteller'),
    ),
    createProjectionUpdateMessageSchema(
      options.publicProjectionSchema,
      z.literal('public'),
    ),
    socketErrorMessageSchema,
  ]);
}

/**
 * Shared server-to-client websocket message union.
 */
export type WebSocketServerMessage<
  TStorytellerProjection = unknown,
  TPublicProjection = unknown,
> =
  | ConnectedMessage
  | SubscribedMessage
  | ProjectionUpdateMessage<TStorytellerProjection, 'storyteller'>
  | ProjectionUpdateMessage<TPublicProjection, 'public'>
  | SocketErrorMessage;

/**
 * Creates a runtime schema for all websocket messages across both directions.
 */
export function createWebSocketMessageSchema<
  TStorytellerProjectionSchema extends z.ZodTypeAny,
  TPublicProjectionSchema extends z.ZodTypeAny,
>(options: {
  readonly storytellerProjectionSchema: TStorytellerProjectionSchema;
  readonly publicProjectionSchema: TPublicProjectionSchema;
}) {
  return z.union([
    webSocketClientMessageSchema,
    createWebSocketServerMessageSchema(options),
  ]);
}

/**
 * Shared websocket message union across both directions.
 */
export type WebSocketMessage<
  TStorytellerProjection = unknown,
  TPublicProjection = unknown,
> =
  | WebSocketClientMessage
  | WebSocketServerMessage<TStorytellerProjection, TPublicProjection>;
