/**
 * Shared metadata that may accompany HTTP responses.
 */
export interface ApiResponseMeta {
  readonly requestId?: string;
  readonly revision?: number;
}

/**
 * Generic error payload for HTTP response envelopes.
 */
export interface ApiError<TCode extends string = string, TDetails = unknown> {
  readonly code: TCode;
  readonly message: string;
  readonly details?: TDetails;
}

/**
 * Standard success envelope for HTTP APIs shared across clients and server.
 */
export interface ApiSuccessEnvelope<TData, TMeta = ApiResponseMeta> {
  readonly ok: true;
  readonly data: TData;
  readonly meta?: TMeta;
}

/**
 * Standard error envelope for HTTP APIs shared across clients and server.
 */
export interface ApiErrorEnvelope<
  TCode extends string = string,
  TDetails = unknown,
  TMeta = ApiResponseMeta,
> {
  readonly ok: false;
  readonly error: ApiError<TCode, TDetails>;
  readonly meta?: TMeta;
}

/**
 * Shared discriminated HTTP response envelope used by both clients and server.
 */
export type ApiResponseEnvelope<
  TData,
  TMeta = ApiResponseMeta,
  TCode extends string = string,
  TDetails = unknown,
> = ApiSuccessEnvelope<TData, TMeta> | ApiErrorEnvelope<TCode, TDetails, TMeta>;
