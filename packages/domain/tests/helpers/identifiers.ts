import type { PlayerId, SeatId, SessionId } from '../../state.js';

export function createSessionId(value: string = 'test-session'): SessionId {
  return {
    kind: 'session',
    value,
  };
}

export function createSeatId(value: string = 'test-seat'): SeatId {
  return {
    kind: 'seat',
    value,
  };
}

export function createPlayerId(value: string = 'test-player'): PlayerId {
  return {
    kind: 'player',
    value,
  };
}
