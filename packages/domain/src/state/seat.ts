import type { SeatId } from './identifiers.js';

/**
 * Canonical seat entity with stable identity.
 */
export interface Seat {
  readonly id: SeatId;
}
