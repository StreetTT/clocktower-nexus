import type { StorytellerProjection } from '../../projectors.js';
import {
  createMinimalProjectionScenario,
  createStorytellerProjectionFromScenario,
} from './projection-scenarios.js';

export function createMinimalStorytellerProjection(): StorytellerProjection {
  return createStorytellerProjectionFromScenario(
    createMinimalProjectionScenario(),
  );
}
