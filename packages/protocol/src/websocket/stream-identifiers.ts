import { z } from 'zod';

/**
 * Shared runtime schema for websocket audience labels.
 */
export const socketAudienceSchema = z.enum(['storyteller', 'public']);

/**
 * Shared audience labels for websocket connections.
 */
export type SocketAudience = z.infer<typeof socketAudienceSchema>;

/**
 * Shared runtime schema for websocket projection stream labels.
 */
export const projectionStreamSchema = socketAudienceSchema;

/**
 * Shared projection stream labels for websocket subscriptions and updates.
 */
export type ProjectionStream = z.infer<typeof projectionStreamSchema>;
