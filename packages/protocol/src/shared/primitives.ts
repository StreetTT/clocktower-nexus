import { z } from 'zod';

/**
 * Shared non-empty string schema used by transport identifiers and codes.
 */
export const nonEmptyTransportStringSchema = z.string().min(1);

/**
 * Shared runtime schema for transport-level session identifiers.
 */
export const sessionIdSchema = nonEmptyTransportStringSchema;

/**
 * Shared runtime schema for transport-level request identifiers.
 */
export const requestIdSchema = nonEmptyTransportStringSchema;

/**
 * Shared runtime schema for non-negative transport revisions.
 */
export const revisionSchema = z.number().int().nonnegative();
