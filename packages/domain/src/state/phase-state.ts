/**
 * Supported high-level phase names for a session.
 */
export type PhaseName = 'setup' | 'day' | 'night';

/**
 * Canonical phase state for a session.
 */
export interface PhaseState {
  readonly current: PhaseName;
}
