export type {
  StorytellerNominationProjection,
  StorytellerPlayerProjection,
  StorytellerProjection,
  StorytellerPublicStatusProjection,
  StorytellerReminderProjection,
  StorytellerRoleProjection,
  StorytellerSeatProjection,
  StorytellerSelectedScriptProjection,
  StorytellerSessionProjection,
  StorytellerTimerProjection,
  StorytellerVoteProjection,
  StorytellerWorkflowProjection,
} from './storyteller-projection.js';

/**
 * Placeholder marker for the projectors module entrypoint.
 */
export interface DomainProjectorsModuleMarker {
  readonly module: 'projectors';
}
