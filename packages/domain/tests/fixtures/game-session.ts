import type { GameSession } from '../../state.js';
import {
  createPlayerId,
  createSeatId,
  createSessionId,
} from '../helpers/identifiers.js';

export function createMinimalGameSession(): GameSession {
  return {
    id: createSessionId(),
    revision: 0,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    phase: {
      current: 'setup',
    },
    seats: [
      {
        id: createSeatId('seat-1'),
      },
    ],
    players: [
      {
        id: createPlayerId('player-1'),
      },
    ],
  };
}
