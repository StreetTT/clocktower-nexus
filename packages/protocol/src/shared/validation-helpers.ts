import { z } from 'zod';

/**
 * Parses unknown input with a provided Zod schema.
 */
export function parseWithSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  input: unknown,
): z.output<TSchema> {
  return schema.parse(input);
}

/**
 * Safely parses unknown input with a provided Zod schema.
 */
export function safeParseWithSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  input: unknown,
) {
  return schema.safeParse(input);
}
