export type PhaseName = 'setup' | 'day' | 'night';

export interface PhaseState {
  readonly current: PhaseName;
}
