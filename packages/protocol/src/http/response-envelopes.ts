import { z } from 'zod';

import {
  nonEmptyTransportStringSchema,
  requestIdSchema,
  revisionSchema,
} from '../shared/index.js';

/**
 * Shared metadata that may accompany HTTP responses.
 */
export const apiResponseMetaSchema = z
  .object({
    requestId: requestIdSchema.optional(),
    revision: revisionSchema.optional(),
  })
  .strict();

/**
 * Shared HTTP response metadata type.
 */
export type ApiResponseMeta = z.infer<typeof apiResponseMetaSchema>;

/**
 * Creates a runtime schema for an HTTP error payload.
 */
export function createApiErrorSchema<
  TCodeSchema extends z.ZodTypeAny = z.ZodString,
  TDetailsSchema extends z.ZodTypeAny = z.ZodUnknown,
>(
  codeSchema: TCodeSchema = nonEmptyTransportStringSchema as unknown as TCodeSchema,
  detailsSchema: TDetailsSchema = z.unknown() as unknown as TDetailsSchema,
) {
  return z
    .object({
      code: codeSchema,
      message: nonEmptyTransportStringSchema,
      details: detailsSchema.optional(),
    })
    .strict();
}

/**
 * Shared runtime schema for a generic HTTP error payload.
 */
export const apiErrorSchema = createApiErrorSchema();

/**
 * Shared generic HTTP error payload type.
 */
export interface ApiError<TCode extends string = string, TDetails = unknown> {
  readonly code: TCode;
  readonly message: string;
  readonly details?: TDetails;
}

/**
 * Creates a runtime schema for an HTTP success envelope.
 */
export function createApiSuccessEnvelopeSchema<
  TDataSchema extends z.ZodTypeAny,
  TMetaSchema extends z.ZodTypeAny = typeof apiResponseMetaSchema,
>(
  dataSchema: TDataSchema,
  metaSchema: TMetaSchema = apiResponseMetaSchema as unknown as TMetaSchema,
) {
  return z
    .object({
      ok: z.literal(true),
      data: dataSchema,
      meta: metaSchema.optional(),
    })
    .strict();
}

/**
 * Shared HTTP success envelope type.
 */
export interface ApiSuccessEnvelope<TData, TMeta = ApiResponseMeta> {
  readonly ok: true;
  readonly data: TData;
  readonly meta?: TMeta;
}

/**
 * Creates a runtime schema for an HTTP error envelope.
 */
export function createApiErrorEnvelopeSchema<
  TCodeSchema extends z.ZodTypeAny = z.ZodString,
  TDetailsSchema extends z.ZodTypeAny = z.ZodUnknown,
  TMetaSchema extends z.ZodTypeAny = typeof apiResponseMetaSchema,
>(
  codeSchema: TCodeSchema = nonEmptyTransportStringSchema as unknown as TCodeSchema,
  detailsSchema: TDetailsSchema = z.unknown() as unknown as TDetailsSchema,
  metaSchema: TMetaSchema = apiResponseMetaSchema as unknown as TMetaSchema,
) {
  return z
    .object({
      ok: z.literal(false),
      error: createApiErrorSchema(codeSchema, detailsSchema),
      meta: metaSchema.optional(),
    })
    .strict();
}

/**
 * Shared HTTP error envelope type.
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
 * Creates a runtime schema for a discriminated HTTP response envelope.
 */
export function createApiResponseEnvelopeSchema<
  TDataSchema extends z.ZodTypeAny,
  TCodeSchema extends z.ZodTypeAny = z.ZodString,
  TDetailsSchema extends z.ZodTypeAny = z.ZodUnknown,
  TMetaSchema extends z.ZodTypeAny = typeof apiResponseMetaSchema,
>(
  dataSchema: TDataSchema,
  options?: {
    readonly codeSchema?: TCodeSchema;
    readonly detailsSchema?: TDetailsSchema;
    readonly metaSchema?: TMetaSchema;
  },
) {
  return z.discriminatedUnion('ok', [
    createApiSuccessEnvelopeSchema(
      dataSchema,
      options?.metaSchema ?? (apiResponseMetaSchema as unknown as TMetaSchema),
    ),
    createApiErrorEnvelopeSchema(
      options?.codeSchema ??
        (nonEmptyTransportStringSchema as unknown as TCodeSchema),
      options?.detailsSchema ?? (z.unknown() as unknown as TDetailsSchema),
      options?.metaSchema ?? (apiResponseMetaSchema as unknown as TMetaSchema),
    ),
  ]);
}

/**
 * Shared discriminated HTTP response envelope type.
 */
export type ApiResponseEnvelope<
  TData,
  TMeta = ApiResponseMeta,
  TCode extends string = string,
  TDetails = unknown,
> = ApiSuccessEnvelope<TData, TMeta> | ApiErrorEnvelope<TCode, TDetails, TMeta>;
