export type {
  ApiError,
  ApiErrorEnvelope,
  ApiRequestShape,
  ApiResponseEnvelope,
  ApiResponseMeta,
  ApiSuccessEnvelope,
} from './http.js';

/**
 * Marker interface for the shared protocol package entrypoint.
 */
export interface ProtocolPackageMarker {
  readonly packageName: 'protocol';
}
