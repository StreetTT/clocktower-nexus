export {
  nonEmptyTransportStringSchema,
  parseWithSchema,
  requestIdSchema,
  revisionSchema,
  safeParseWithSchema,
  sessionIdSchema,
} from './src/shared/index.js';
export type {
  ApiError,
  ApiErrorEnvelope,
  ApiRequestShape,
  ApiResponseEnvelope,
  ApiResponseMeta,
  ApiSuccessEnvelope,
} from './http.js';
export {
  apiErrorSchema,
  apiResponseMetaSchema,
  createApiErrorEnvelopeSchema,
  createApiErrorSchema,
  createApiRequestShapeSchema,
  createApiResponseEnvelopeSchema,
  createApiSuccessEnvelopeSchema,
} from './http.js';
export type {
  ConnectMessage,
  ConnectedMessage,
  ProjectionStream,
  ProjectionUpdateMessage,
  SocketAudience,
  SocketErrorMessage,
  SubscribeMessage,
  SubscribedMessage,
  WebSocketClientMessage,
  WebSocketMessage,
  WebSocketServerMessage,
} from './websocket.js';
export {
  connectMessageSchema,
  connectedMessageSchema,
  createProjectionUpdateMessageSchema,
  createWebSocketMessageSchema,
  createWebSocketServerMessageSchema,
  projectionStreamSchema,
  socketAudienceSchema,
  socketErrorMessageSchema,
  subscribeMessageSchema,
  subscribedMessageSchema,
  webSocketClientMessageSchema,
} from './websocket.js';

/**
 * Marker interface for the shared protocol package entrypoint.
 */
export interface ProtocolPackageMarker {
  readonly packageName: 'protocol';
}
