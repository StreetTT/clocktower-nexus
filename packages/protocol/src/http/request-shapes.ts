import { z } from 'zod';

type ApiRequestSection<TKey extends 'params' | 'query' | 'body', TValue> =
  [TValue] extends [undefined]
    ? Record<never, never>
    : { readonly [K in TKey]: TValue };

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
  const shape: Record<string, z.ZodTypeAny> = {};

  if (options.params) {
    shape.params = options.params;
  }

  if (options.query) {
    shape.query = options.query;
  }

  if (options.body) {
    shape.body = options.body;
  }

  return z.object(shape).strict();
}
