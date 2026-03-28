export {
  LIFE_STATE_COMMANDS,
  PHASE_VOTE_COMMANDS,
  PLAYER_COMMANDS,
  PRIVATE_STORYTELLER_COMMANDS,
  SEAT_COMMANDS,
  SESSION_COMMANDS,
  TIMER_STATUS_COMMANDS,
} from './commands.js';
export type {
  DomainCommand,
  DomainCommandsModuleMarker,
  DomainCommandType,
  LifeStateCommandType,
  PhaseVoteCommandType,
  PlayerCommandType,
  PrivateStorytellerCommandType,
  SeatCommandType,
  SessionCommandType,
  SessionScopedCommand,
  TimerStatusCommandType,
} from './commands.js';
export type { DomainEventsModuleMarker } from './events.js';
export type { DomainProjectorsModuleMarker } from './projectors.js';
export type { DomainReducersModuleMarker } from './reducers.js';
export type {
  DomainStateModuleMarker,
  EntityId,
  GameSession,
  IsoTimestamp,
  PhaseName,
  PhaseState,
  Player,
  PlayerId,
  Seat,
  SeatId,
  SessionId,
  SessionRevision,
} from './state.js';

/**
 * Placeholder marker for the domain package entrypoint.
 */
export interface DomainPackageMarker {
  readonly packageName: 'domain';
}
