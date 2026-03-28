/**
 * Shared audience labels for websocket connections.
 */
export type SocketAudience = 'storyteller' | 'public';

/**
 * Shared projection stream labels for websocket subscriptions and updates.
 */
export type ProjectionStream = SocketAudience;
