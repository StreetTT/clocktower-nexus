import type { PublicProjection } from '../../projectors.js';
import {
  createMinimalProjectionScenario,
  createPublicProjectionFromScenario,
} from './projection-scenarios.js';

export function createMinimalPublicProjection(): PublicProjection {
  return createPublicProjectionFromScenario(createMinimalProjectionScenario());
}
