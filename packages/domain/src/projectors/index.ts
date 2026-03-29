export type {
  PublicNominationProjection,
  PublicProjection,
  PublicSeatProjection,
  PublicSelectedScriptProjection,
  PublicSessionProjection,
  PublicStatusProjection,
  PublicTimerProjection,
  PublicVoteProjection,
  PublicWorkflowProjection,
} from './public-projection.js';
export type {
  StorytellerAlignmentProjection,
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
