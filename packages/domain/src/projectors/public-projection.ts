import type {
  IsoTimestamp,
  PhaseState,
  SeatId,
  SessionId,
  SessionRevision,
} from '../state/index.js';

/**
 * Read-only public projection rendered by the shared display.
 */
export interface PublicProjection {
  readonly session: PublicSessionProjection;
  readonly seats: readonly PublicSeatProjection[];
  readonly workflow: PublicWorkflowProjection;
  readonly publicStatus: PublicStatusProjection | null;
  readonly selectedScript: PublicSelectedScriptProjection | null;
}

/**
 * Session summary metadata carried by the public projection.
 */
export interface PublicSessionProjection {
  readonly sessionId: SessionId;
  readonly revision: SessionRevision;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
  readonly phase: PhaseState;
}

/**
 * Public seat view containing only shared-screen-safe state.
 */
export interface PublicSeatProjection {
  readonly seatId: SeatId;
  readonly position: number;
  readonly displayName: string | null;
  readonly isOccupied: boolean;
  readonly isAlive: boolean | null;
  readonly ghostVoteAvailable: boolean | null;
  readonly isNominated: boolean;
  readonly isVoting: boolean;
}

/**
 * Public workflow state for phase, nomination, vote, and timer rendering.
 */
export interface PublicWorkflowProjection {
  readonly phase: PhaseState;
  readonly activeNomination: PublicNominationProjection | null;
  readonly activeVote: PublicVoteProjection | null;
  readonly timer: PublicTimerProjection | null;
}

/**
 * Public nomination context shown on the shared display.
 */
export interface PublicNominationProjection {
  readonly nominatorSeatId: SeatId;
  readonly nomineeSeatId: SeatId;
  readonly isOpen: boolean;
}

/**
 * Public vote context shown on the shared display.
 */
export interface PublicVoteProjection {
  readonly nomineeSeatId: SeatId;
  readonly participatingSeatIds: readonly SeatId[];
  readonly isOpen: boolean;
}

/**
 * Public timer state shown on the shared display.
 */
export interface PublicTimerProjection {
  readonly isRunning: boolean;
  readonly remainingSeconds: number;
}

/**
 * Public banner or status text shown on the shared display.
 */
export interface PublicStatusProjection {
  readonly text: string;
}

/**
 * Public-safe selected script summary shown on the shared display.
 */
export interface PublicSelectedScriptProjection {
  readonly scriptId: string;
  readonly scriptName: string;
}
