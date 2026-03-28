export const SESSION_COMMANDS = {
  createSession: 'create_session',
  archiveSession: 'archive_session',
} as const;

export const SEAT_COMMANDS = {
  addSeat: 'add_seat',
  removeSeat: 'remove_seat',
  assignPlayerToSeat: 'assign_player_to_seat',
  reorderSeats: 'reorder_seats',
} as const;

export const PLAYER_COMMANDS = {
  setPlayerName: 'set_player_name',
} as const;

export const LIFE_STATE_COMMANDS = {
  markPlayerDead: 'mark_player_dead',
  revivePlayer: 'revive_player',
  consumeGhostVote: 'consume_ghost_vote',
  restoreGhostVote: 'restore_ghost_vote',
} as const;

export const PHASE_VOTE_COMMANDS = {
  setPhase: 'set_phase',
  startNomination: 'start_nomination',
  closeNomination: 'close_nomination',
  startVote: 'start_vote',
  updateVote: 'update_vote',
  closeVote: 'close_vote',
} as const;

export const PRIVATE_STORYTELLER_COMMANDS = {
  selectScript: 'select_script',
  assignRole: 'assign_role',
  changeRole: 'change_role',
  addReminderMarker: 'add_reminder_marker',
  removeReminderMarker: 'remove_reminder_marker',
  setSessionNote: 'set_session_note',
  setSeatNote: 'set_seat_note',
} as const;

export const TIMER_STATUS_COMMANDS = {
  startTimer: 'start_timer',
  stopTimer: 'stop_timer',
  resetTimer: 'reset_timer',
  setPublicStatus: 'set_public_status',
  clearPublicStatus: 'clear_public_status',
} as const;

export type SessionCommandType =
  (typeof SESSION_COMMANDS)[keyof typeof SESSION_COMMANDS];
export type SeatCommandType =
  (typeof SEAT_COMMANDS)[keyof typeof SEAT_COMMANDS];
export type PlayerCommandType =
  (typeof PLAYER_COMMANDS)[keyof typeof PLAYER_COMMANDS];
export type LifeStateCommandType =
  (typeof LIFE_STATE_COMMANDS)[keyof typeof LIFE_STATE_COMMANDS];
export type PhaseVoteCommandType =
  (typeof PHASE_VOTE_COMMANDS)[keyof typeof PHASE_VOTE_COMMANDS];
export type PrivateStorytellerCommandType =
  (typeof PRIVATE_STORYTELLER_COMMANDS)[keyof typeof PRIVATE_STORYTELLER_COMMANDS];
export type TimerStatusCommandType =
  (typeof TIMER_STATUS_COMMANDS)[keyof typeof TIMER_STATUS_COMMANDS];

export type DomainCommandType =
  | SessionCommandType
  | SeatCommandType
  | PlayerCommandType
  | LifeStateCommandType
  | PhaseVoteCommandType
  | PrivateStorytellerCommandType
  | TimerStatusCommandType;
