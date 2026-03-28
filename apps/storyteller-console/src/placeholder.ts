import type {
  DomainPackageMarker,
  DomainStateModuleMarker,
} from '@clocktower-nexus/domain';
import type { DomainCommandsModuleMarker } from '@clocktower-nexus/domain/commands';

export interface StorytellerConsolePlaceholder {
  readonly domainPackage: DomainPackageMarker['packageName'];
  readonly domainStateModule: DomainStateModuleMarker['module'];
  readonly domainCommandsModule: DomainCommandsModuleMarker['module'];
}
