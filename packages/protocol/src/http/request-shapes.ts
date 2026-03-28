import { z } from 'zod';

/**
 * Shared transport helper for endpoint-specific HTTP request shapes.
 */
export interface ApiRequestShape<
  TParams = undefined,
  TQuery = undefined,
  TBody = undefined,
> {
  readonly params?: TParams;
  readonly query?: TQuery;
  readonly body?: TBody;
}

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
