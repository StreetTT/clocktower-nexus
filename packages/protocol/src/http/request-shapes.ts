import { z } from 'zod';

type ApiRequestSection<TKey extends 'params' | 'query' | 'body', TValue> =
  [TValue] extends [undefined]
    ? Record<never, never>
    : { readonly [K in TKey]: TValue };

type ApiRequestShapeSchemaSection<
  TKey extends 'params' | 'query' | 'body',
  TSchema extends z.ZodTypeAny | undefined,
> = [TSchema] extends [z.ZodTypeAny]
  ? { [K in TKey]: TSchema }
  : Record<never, never>;

type ApiRequestSchemaShape<
  TParamsSchema extends z.ZodTypeAny | undefined,
  TQuerySchema extends z.ZodTypeAny | undefined,
  TBodySchema extends z.ZodTypeAny | undefined,
> = ApiRequestShapeSchemaSection<'params', TParamsSchema> &
  ApiRequestShapeSchemaSection<'query', TQuerySchema> &
  ApiRequestShapeSchemaSection<'body', TBodySchema>;

/**
 * Shared transport helper for endpoint-specific HTTP request shapes.
 */
export type ApiRequestShape<
  TParams = undefined,
  TQuery = undefined,
  TBody = undefined,
> = ApiRequestSection<'params', TParams> &
  ApiRequestSection<'query', TQuery> &
  ApiRequestSection<'body', TBody>;

/**
 * Creates a runtime schema for an endpoint-specific HTTP request shape.
 */
export function createApiRequestShapeSchema<
  TParamsSchema extends z.ZodTypeAny | undefined = undefined,
  TQuerySchema extends z.ZodTypeAny | undefined = undefined,
  TBodySchema extends z.ZodTypeAny | undefined = undefined,
>(options: {
  readonly params?: TParamsSchema;
  readonly query?: TQuerySchema;
  readonly body?: TBodySchema;
}) {
  const shape = {
    ...(options.params ? { params: options.params } : {}),
    ...(options.query ? { query: options.query } : {}),
    ...(options.body ? { body: options.body } : {}),
  } as ApiRequestSchemaShape<TParamsSchema, TQuerySchema, TBodySchema>;

  return z.object(shape).strict();
}
