export type {
  ApiError,
  ApiErrorEnvelope,
  ApiRequestShape,
  ApiResponseEnvelope,
  ApiResponseMeta,
  ApiSuccessEnvelope,
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

/**
 * Marker interface for the shared protocol package entrypoint.
 */
export interface ProtocolPackageMarker {
  readonly packageName: 'protocol';
}
