import type { PlayerId } from './identifiers.js';

/**
 * Canonical player entity with stable identity.
 */
export interface Player {
  readonly id: PlayerId;
}
