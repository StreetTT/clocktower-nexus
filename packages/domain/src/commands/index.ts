export {
  LIFE_STATE_COMMANDS,
  PHASE_VOTE_COMMANDS,
  PLAYER_COMMANDS,
  PRIVATE_STORYTELLER_COMMANDS,
  SEAT_COMMANDS,
  SESSION_COMMANDS,
  TIMER_STATUS_COMMANDS,
} from './command-names.js';
export type {
  DomainCommandType,
  LifeStateCommandType,
  PhaseVoteCommandType,
  PlayerCommandType,
  PrivateStorytellerCommandType,
  SeatCommandType,
  SessionCommandType,
  TimerStatusCommandType,
} from './command-names.js';
export type { DomainCommand, SessionScopedCommand } from './command-types.js';

/**
 * Placeholder marker for the commands module entrypoint.
 */
export interface DomainCommandsModuleMarker {
  readonly module: 'commands';
}
