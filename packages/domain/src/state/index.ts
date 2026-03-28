export type { EntityId, PlayerId, SeatId, SessionId } from './identifiers.js';
export type { GameSession } from './game-session.js';
export type { IsoTimestamp, SessionRevision } from './metadata.js';
export type { PhaseName, PhaseState } from './phase-state.js';
export type { Player } from './player.js';
export type { Seat } from './seat.js';

export interface DomainStateModuleMarker {
  readonly module: 'state';
}
