import type {
  DomainPackageMarker,
  GameSession,
  SessionId,
} from '@clocktower-nexus/domain';
import type { DomainCommandsModuleMarker } from '@clocktower-nexus/domain/commands';
import type { PhaseState } from '@clocktower-nexus/domain/state';

const storytellerConsoleSessionId: SessionId = {
  kind: 'session',
  value: 'storyteller-console-placeholder',
};

const storytellerConsolePhase: PhaseState = {
  current: 'setup',
};

export const storytellerConsolePlaceholderSession: GameSession = {
  id: storytellerConsoleSessionId,
  revision: 0,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  phase: storytellerConsolePhase,
  seats: [],
  players: [],
};

export interface StorytellerConsolePlaceholder {
  readonly domainPackage: DomainPackageMarker['packageName'];
  readonly sessionIdKind: SessionId['kind'];
  readonly phaseName: PhaseState['current'];
  readonly domainCommandsModule: DomainCommandsModuleMarker['module'];
}
