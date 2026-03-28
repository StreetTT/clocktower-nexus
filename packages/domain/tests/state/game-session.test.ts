import { describe, expect, it } from 'vitest';

import { createMinimalGameSession } from '../fixtures/game-session.js';
import {
  createPlayerId,
  createSeatId,
  createSessionId,
} from '../helpers/identifiers.js';

describe('GameSession fixtures', () => {
  it('constructs a minimal canonical session skeleton', () => {
    const session = createMinimalGameSession();

    expect(session.id).toEqual({
      kind: 'session',
      value: 'test-session',
    });
    expect(session.revision).toBe(0);
    expect(session.phase.current).toBe('setup');
    expect(session.seats).toHaveLength(1);
    expect(session.players).toHaveLength(1);
  });

  it('creates stable object-wrapped identifiers for fixtures', () => {
    expect(createSessionId('session-a')).toEqual({
      kind: 'session',
      value: 'session-a',
    });
    expect(createSeatId('seat-a')).toEqual({
      kind: 'seat',
      value: 'seat-a',
    });
    expect(createPlayerId('player-a')).toEqual({
      kind: 'player',
      value: 'player-a',
    });
  });
});
