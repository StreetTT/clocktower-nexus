import type { IsoTimestamp, SessionRevision } from './metadata.js';
import type { PhaseState } from './phase-state.js';
import type { Player } from './player.js';
import type { Seat } from './seat.js';
import type { SessionId } from './identifiers.js';

export interface GameSession {
  readonly id: SessionId;
  readonly revision: SessionRevision;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
  readonly phase: PhaseState;
  readonly seats: readonly Seat[];
  readonly players: readonly Player[];
}
