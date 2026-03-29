import type { PublicProjection } from '../../projectors.js';
import { createSeatId, createSessionId } from '../helpers/identifiers.js';

export function createMinimalPublicProjection(): PublicProjection {
  const sessionId = createSessionId();
  const seatId = createSeatId('seat-1');

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
        displayName: 'Player One',
        isOccupied: true,
        isAlive: true,
        ghostVoteAvailable: true,
        isNominated: false,
        isVoting: false,
      },
    ],
    workflow: {
      phase: {
        current: 'setup',
      },
      activeNomination: null,
      activeVote: null,
      timer: null,
    },
    publicStatus: null,
    selectedScript: {
      scriptId: 'tb',
      scriptName: 'Trouble Brewing',
    },
  };
}
