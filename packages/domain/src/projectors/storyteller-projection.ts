import type {
  IsoTimestamp,
  PhaseState,
  PlayerId,
  SeatId,
  SessionId,
  SessionRevision,
} from '../state/index.js';

/**
 * Private Storyteller read model used by the console.
 */
export interface StorytellerProjection {
  readonly session: StorytellerSessionProjection;
  readonly seats: readonly StorytellerSeatProjection[];
  readonly players: readonly StorytellerPlayerProjection[];
  readonly workflow: StorytellerWorkflowProjection;
  readonly selectedScript: StorytellerSelectedScriptProjection | null;
  readonly sessionNote: string | null;
}

/**
 * Session summary metadata for the private Storyteller projection.
 */
export interface StorytellerSessionProjection {
  readonly sessionId: SessionId;
  readonly revision: SessionRevision;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
  readonly phase: PhaseState;
}

/**
 * Ordered seat view used to render the console's primary circle layout.
 */
export interface StorytellerSeatProjection {
  readonly seatId: SeatId;
  readonly position: number;
  readonly occupantPlayerId: PlayerId | null;
  readonly note: string | null;
}

/**
 * Private player view containing hidden gameplay state and player-owned artifacts.
 */
export interface StorytellerPlayerProjection {
  readonly playerId: PlayerId;
  readonly assignedSeatId: SeatId | null;
  readonly displayName: string;
  readonly isAlive: boolean;
  readonly ghostVoteAvailable: boolean;
  readonly role: StorytellerRoleProjection | null;
  readonly alignment: StorytellerAlignmentProjection | null;
  readonly reminders: readonly StorytellerReminderProjection[];
  readonly note: string | null;
}

/**
 * Private role summary shown in Storyteller setup and control workflows.
 */
export interface StorytellerRoleProjection {
  readonly roleId: string;
  readonly roleName: string;
}

/**
 * Private alignment summary shown alongside role data in Storyteller workflows.
 */
export interface StorytellerAlignmentProjection {
  readonly alignmentId: string;
  readonly alignmentName: string;
}

/**
 * Private reminder marker shown in Storyteller workflows.
 */
export interface StorytellerReminderProjection {
  readonly reminderId: string;
  readonly text: string;
}

/**
 * Private workflow state that drives phase, nomination, vote, timer, and public-status controls.
 */
export interface StorytellerWorkflowProjection {
  readonly phase: PhaseState;
  readonly activeNomination: StorytellerNominationProjection | null;
  readonly activeVote: StorytellerVoteProjection | null;
  readonly timer: StorytellerTimerProjection | null;
  readonly publicStatus: StorytellerPublicStatusProjection | null;
}

/**
 * Active nomination state shown in the private Storyteller workflow.
 */
export interface StorytellerNominationProjection {
  readonly nominatorPlayerId: PlayerId;
  readonly nomineePlayerId: PlayerId;
  readonly isOpen: boolean;
}

/**
 * Active vote state shown in the private Storyteller workflow.
 */
export interface StorytellerVoteProjection {
  readonly nomineePlayerId: PlayerId;
  readonly participatingPlayerIds: readonly PlayerId[];
  readonly isOpen: boolean;
}

/**
 * Timer state shown in the private Storyteller workflow.
 */
export interface StorytellerTimerProjection {
  readonly isRunning: boolean;
  readonly remainingSeconds: number;
  readonly visibleToPublic: boolean;
}

/**
 * Public-status banner state controlled from the Storyteller workflow.
 */
export interface StorytellerPublicStatusProjection {
  readonly text: string;
}

/**
 * Selected script summary shown in Storyteller setup workflows.
 */
export interface StorytellerSelectedScriptProjection {
  readonly scriptId: string;
  readonly scriptName: string;
}
