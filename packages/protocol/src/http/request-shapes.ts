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
