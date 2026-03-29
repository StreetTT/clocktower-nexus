import type {
  PublicProjection,
  StorytellerProjection,
} from '../../projectors.js';
import {
  createPlayerId,
  createSeatId,
  createSessionId,
} from '../helpers/identifiers.js';

export interface ProjectionScenarioSeat {
  readonly seatId: ReturnType<typeof createSeatId>;
  readonly playerId: ReturnType<typeof createPlayerId>;
  readonly position: number;
  readonly displayName: string;
  readonly isAlive: boolean;
  readonly ghostVoteAvailable: boolean;
  readonly seatNote: string | null;
  readonly playerNote: string | null;
  readonly role: {
    readonly roleId: string;
    readonly roleName: string;
  } | null;
  readonly alignment: {
    readonly alignmentId: string;
    readonly alignmentName: string;
  } | null;
  readonly reminders: readonly {
    readonly reminderId: string;
    readonly text: string;
  }[];
}

export interface ProjectionScenario {
  readonly sessionId: ReturnType<typeof createSessionId>;
  readonly revision: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly phase: 'setup' | 'day' | 'night';
  readonly seats: readonly ProjectionScenarioSeat[];
  readonly activeNomination: {
    readonly nominatorSeatId: ProjectionScenarioSeat['seatId'];
    readonly nominatorPlayerId: ProjectionScenarioSeat['playerId'];
    readonly nomineeSeatId: ProjectionScenarioSeat['seatId'];
    readonly nomineePlayerId: ProjectionScenarioSeat['playerId'];
    readonly isOpen: boolean;
  } | null;
  readonly activeVote: {
    readonly nomineeSeatId: ProjectionScenarioSeat['seatId'];
    readonly nomineePlayerId: ProjectionScenarioSeat['playerId'];
    readonly participatingSeatIds: readonly ProjectionScenarioSeat['seatId'][];
    readonly participatingPlayerIds: readonly ProjectionScenarioSeat['playerId'][];
    readonly isOpen: boolean;
  } | null;
  readonly timer: {
    readonly isRunning: boolean;
    readonly remainingSeconds: number;
    readonly visibleToPublic: boolean;
  } | null;
  readonly publicStatus: {
    readonly text: string;
  } | null;
  readonly selectedScript: {
    readonly scriptId: string;
    readonly scriptName: string;
  } | null;
  readonly sessionNote: string | null;
}

export function createMinimalProjectionScenario(): ProjectionScenario {
  const seatId = createSeatId('seat-1');
  const playerId = createPlayerId('player-1');

  return {
    sessionId: createSessionId(),
    revision: 0,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    phase: 'setup',
    seats: [
      {
        seatId,
        playerId,
        position: 0,
        displayName: 'Player One',
        isAlive: true,
        ghostVoteAvailable: true,
        seatNote: null,
        playerNote: null,
        role: {
          roleId: 'washerwoman',
          roleName: 'Washerwoman',
        },
        alignment: {
          alignmentId: 'good',
          alignmentName: 'Good',
        },
        reminders: [
          {
            reminderId: 'reminder-1',
            text: 'Shown first night',
          },
        ],
      },
    ],
    activeNomination: null,
    activeVote: null,
    timer: null,
    publicStatus: null,
    selectedScript: {
      scriptId: 'tb',
      scriptName: 'Trouble Brewing',
    },
    sessionNote: null,
  };
}

export function createVisibilityRegressionProjectionScenario(): ProjectionScenario {
  const seatOneId = createSeatId('seat-1');
  const playerOneId = createPlayerId('player-1');
  const seatTwoId = createSeatId('seat-2');
  const playerTwoId = createPlayerId('player-2');

  return {
    sessionId: createSessionId('visibility-session'),
    revision: 4,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:05:00.000Z',
    phase: 'day',
    seats: [
      {
        seatId: seatOneId,
        playerId: playerOneId,
        position: 0,
        displayName: 'Player One',
        isAlive: true,
        ghostVoteAvailable: true,
        seatNote: 'Thinks seat two is evil.',
        playerNote: 'Privately suspected as poisoned.',
        role: {
          roleId: 'washerwoman',
          roleName: 'Washerwoman',
        },
        alignment: {
          alignmentId: 'good',
          alignmentName: 'Good',
        },
        reminders: [
          {
            reminderId: 'reminder-1',
            text: 'Shown first night',
          },
        ],
      },
      {
        seatId: seatTwoId,
        playerId: playerTwoId,
        position: 1,
        displayName: 'Player Two',
        isAlive: false,
        ghostVoteAvailable: false,
        seatNote: 'Claimed Virgin.',
        playerNote: 'Use as nomination example.',
        role: {
          roleId: 'imp',
          roleName: 'Imp',
        },
        alignment: {
          alignmentId: 'evil',
          alignmentName: 'Evil',
        },
        reminders: [
          {
            reminderId: 'reminder-2',
            text: 'Poisoned tonight',
          },
        ],
      },
    ],
    activeNomination: {
      nominatorSeatId: seatOneId,
      nominatorPlayerId: playerOneId,
      nomineeSeatId: seatTwoId,
      nomineePlayerId: playerTwoId,
      isOpen: true,
    },
    activeVote: {
      nomineeSeatId: seatTwoId,
      nomineePlayerId: playerTwoId,
      participatingSeatIds: [seatOneId],
      participatingPlayerIds: [playerOneId],
      isOpen: true,
    },
    timer: {
      isRunning: true,
      remainingSeconds: 42,
      visibleToPublic: true,
    },
    publicStatus: {
      text: 'Voting in progress',
    },
    selectedScript: {
      scriptId: 'tb',
      scriptName: 'Trouble Brewing',
    },
    sessionNote: 'Keep the bluffing pace high.',
  };
}

export function createStorytellerProjectionFromScenario(
  scenario: ProjectionScenario,
): StorytellerProjection {
  return {
    session: {
      sessionId: scenario.sessionId,
      revision: scenario.revision,
      createdAt: scenario.createdAt,
      updatedAt: scenario.updatedAt,
      phase: {
        current: scenario.phase,
      },
    },
    seats: scenario.seats.map((seat) => ({
      seatId: seat.seatId,
      position: seat.position,
      occupantPlayerId: seat.playerId,
      note: seat.seatNote,
    })),
    players: scenario.seats.map((seat) => ({
      playerId: seat.playerId,
      assignedSeatId: seat.seatId,
      displayName: seat.displayName,
      isAlive: seat.isAlive,
      ghostVoteAvailable: seat.ghostVoteAvailable,
      role: seat.role,
      alignment: seat.alignment,
      reminders: seat.reminders,
      note: seat.playerNote,
    })),
    workflow: {
      phase: {
        current: scenario.phase,
      },
      activeNomination: scenario.activeNomination
        ? {
            nominatorPlayerId: scenario.activeNomination.nominatorPlayerId,
            nomineePlayerId: scenario.activeNomination.nomineePlayerId,
            isOpen: scenario.activeNomination.isOpen,
          }
        : null,
      activeVote: scenario.activeVote
        ? {
            nomineePlayerId: scenario.activeVote.nomineePlayerId,
            participatingPlayerIds: scenario.activeVote.participatingPlayerIds,
            isOpen: scenario.activeVote.isOpen,
          }
        : null,
      timer: scenario.timer
        ? {
            isRunning: scenario.timer.isRunning,
            remainingSeconds: scenario.timer.remainingSeconds,
            visibleToPublic: scenario.timer.visibleToPublic,
          }
        : null,
      publicStatus: scenario.publicStatus,
    },
    selectedScript: scenario.selectedScript,
    sessionNote: scenario.sessionNote,
  };
}

export function createPublicProjectionFromScenario(
  scenario: ProjectionScenario,
): PublicProjection {
  return {
    session: {
      sessionId: scenario.sessionId,
      revision: scenario.revision,
      createdAt: scenario.createdAt,
      updatedAt: scenario.updatedAt,
      phase: {
        current: scenario.phase,
      },
    },
    seats: scenario.seats.map((seat) => ({
      seatId: seat.seatId,
      position: seat.position,
      displayName: seat.displayName,
      isOccupied: true,
      isAlive: seat.isAlive,
      ghostVoteAvailable: seat.ghostVoteAvailable,
      isNominated:
        scenario.activeNomination?.nomineeSeatId.value === seat.seatId.value,
      isVoting:
        scenario.activeVote?.participatingSeatIds.some(
          (participatingSeatId) =>
            participatingSeatId.value === seat.seatId.value,
        ) ?? false,
    })),
    workflow: {
      phase: {
        current: scenario.phase,
      },
      activeNomination: scenario.activeNomination
        ? {
            nominatorSeatId: scenario.activeNomination.nominatorSeatId,
            nomineeSeatId: scenario.activeNomination.nomineeSeatId,
            isOpen: scenario.activeNomination.isOpen,
          }
        : null,
      activeVote: scenario.activeVote
        ? {
            nomineeSeatId: scenario.activeVote.nomineeSeatId,
            participatingSeatIds: scenario.activeVote.participatingSeatIds,
            isOpen: scenario.activeVote.isOpen,
          }
        : null,
      timer: scenario.timer
        ? {
            isRunning: scenario.timer.isRunning,
            remainingSeconds: scenario.timer.remainingSeconds,
          }
        : null,
    },
    publicStatus: scenario.publicStatus,
    selectedScript: scenario.selectedScript,
  };
}
