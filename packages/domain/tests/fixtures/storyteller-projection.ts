import type { StorytellerProjection } from '../../projectors.js';
import {
  createPlayerId,
  createSeatId,
  createSessionId,
} from '../helpers/identifiers.js';

export function createMinimalStorytellerProjection(): StorytellerProjection {
  const sessionId = createSessionId();
  const seatId = createSeatId('seat-1');
  const playerId = createPlayerId('player-1');

  return {
    session: {
      sessionId,
      revision: 0,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
      phase: {
        current: 'setup',
      },
    },
    seats: [
      {
        seatId,
        position: 0,
        occupantPlayerId: playerId,
        note: null,
      },
    ],
    players: [
      {
        playerId,
        assignedSeatId: seatId,
        displayName: 'Player One',
        isAlive: true,
        ghostVoteAvailable: true,
        role: {
          roleId: 'washerwoman',
          roleName: 'Washerwoman',
        },
        reminders: [
          {
            reminderId: 'reminder-1',
            text: 'Shown first night',
          },
        ],
        note: null,
      },
    ],
    workflow: {
      phase: {
        current: 'setup',
      },
      activeNomination: null,
      activeVote: null,
      timer: null,
      publicStatus: null,
    },
    selectedScript: {
      scriptId: 'tb',
      scriptName: 'Trouble Brewing',
    },
    sessionNote: null,
  };
}
