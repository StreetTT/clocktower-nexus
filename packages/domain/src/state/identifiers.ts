/**
 * Shared object-wrapped identifier shape for canonical entities.
 */
export interface EntityId<TKind extends string> {
  readonly kind: TKind;
  readonly value: string;
}

/**
 * Identifier for a canonical game session.
 */
export type SessionId = EntityId<'session'>;
/**
 * Identifier for a canonical seat.
 */
export type SeatId = EntityId<'seat'>;
/**
 * Identifier for a canonical player.
 */
export type PlayerId = EntityId<'player'>;
