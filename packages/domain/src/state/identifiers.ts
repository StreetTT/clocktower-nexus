export interface EntityId<TKind extends string> {
  readonly kind: TKind;
  readonly value: string;
}

export type SessionId = EntityId<'session'>;
export type SeatId = EntityId<'seat'>;
export type PlayerId = EntityId<'player'>;
