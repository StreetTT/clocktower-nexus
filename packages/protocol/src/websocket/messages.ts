import type { ProjectionStream, SocketAudience } from './stream-identifiers.js';

/**
 * Common websocket message base shape.
 */
export interface WebSocketMessageBase<TType extends string> {
  readonly type: TType;
}

/**
 * Common websocket request base shape for client-initiated messages.
 */
export interface WebSocketRequestBase<
  TType extends string,
> extends WebSocketMessageBase<TType> {
  readonly requestId?: string;
}

/**
 * Common websocket response base shape for server-initiated messages.
 */
export interface WebSocketResponseBase<
  TType extends string,
> extends WebSocketMessageBase<TType> {
  readonly requestId?: string;
}

/**
 * Client message for starting a websocket session context.
 */
export interface ConnectMessage extends WebSocketRequestBase<'connect'> {
  readonly sessionId: string;
  readonly audience: SocketAudience;
  readonly lastKnownRevision?: number;
}

/**
 * Server acknowledgement for an accepted websocket connection.
 */
export interface ConnectedMessage extends WebSocketResponseBase<'connected'> {
  readonly sessionId: string;
  readonly audience: SocketAudience;
  readonly currentRevision?: number;
}

/**
 * Client message for subscribing to a projection stream.
 */
export interface SubscribeMessage extends WebSocketRequestBase<'subscribe'> {
  readonly sessionId: string;
  readonly stream: ProjectionStream;
  readonly sinceRevision?: number;
}

/**
 * Server acknowledgement for an accepted projection subscription.
 */
export interface SubscribedMessage extends WebSocketResponseBase<'subscribed'> {
  readonly sessionId: string;
  readonly stream: ProjectionStream;
  readonly currentRevision?: number;
}

/**
 * Server message containing a full projection snapshot for a subscribed stream.
 */
export interface ProjectionUpdateMessage<
  TProjection,
  TStream extends ProjectionStream = ProjectionStream,
> extends WebSocketMessageBase<'projection_update'> {
  readonly sessionId: string;
  readonly stream: TStream;
  readonly revision: number;
  readonly projection: TProjection;
}

/**
 * Generic websocket error message sent from server to client.
 */
export interface SocketErrorMessage<
  TCode extends string = string,
  TDetails = unknown,
> extends WebSocketResponseBase<'socket_error'> {
  readonly error: {
    readonly code: TCode;
    readonly message: string;
    readonly details?: TDetails;
  };
  readonly sessionId?: string;
  readonly currentRevision?: number;
  readonly recoverable?: boolean;
}

/**
 * Shared client-to-server websocket message union.
 */
export type WebSocketClientMessage = ConnectMessage | SubscribeMessage;

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
 * Shared websocket message union across both directions.
 */
export type WebSocketMessage<
  TStorytellerProjection = unknown,
  TPublicProjection = unknown,
> =
  | WebSocketClientMessage
  | WebSocketServerMessage<TStorytellerProjection, TPublicProjection>;
