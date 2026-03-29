import type {
  DomainPackageMarker,
  GameSession,
  SessionId,
  StorytellerProjection,
} from '@clocktower-nexus/domain';
import {
  PHASE_VOTE_COMMANDS,
  PLAYER_COMMANDS,
  SESSION_COMMANDS,
} from '@clocktower-nexus/domain/commands';
import type {
  DomainCommand,
  DomainCommandsModuleMarker,
  SessionScopedCommand,
} from '@clocktower-nexus/domain/commands';
import type { PhaseState } from '@clocktower-nexus/domain/state';
import type {
  ApiRequestShape,
  ApiSuccessEnvelope,
} from '@clocktower-nexus/protocol/http';
import {
  createApiSuccessEnvelopeSchema,
  safeParseWithSchema,
} from '@clocktower-nexus/protocol';
import {
  connectMessageSchema,
  type ConnectMessage,
} from '@clocktower-nexus/protocol/websocket';
import { z } from 'zod';

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

export const storytellerConsoleCreateSessionCommand: DomainCommand<'create_session'> =
  {
    type: SESSION_COMMANDS.createSession,
  };

export const storytellerConsoleSetPhaseCommand: SessionScopedCommand<'set_phase'> =
  {
    type: PHASE_VOTE_COMMANDS.setPhase,
    sessionId: storytellerConsoleSessionId,
  };

export const storytellerConsoleSetPlayerNameCommand: SessionScopedCommand<'set_player_name'> =
  {
    type: PLAYER_COMMANDS.setPlayerName,
    sessionId: storytellerConsoleSessionId,
  };

export const storytellerConsoleBootstrapRequest: ApiRequestShape<
  { readonly sessionId: string },
  { readonly role: 'storyteller' },
  undefined
> = {
  params: {
    sessionId: storytellerConsoleSessionId.value,
  },
  query: {
    role: 'storyteller',
  },
};

export const storytellerConsoleBootstrapResponse: ApiSuccessEnvelope<{
  readonly session: GameSession;
}> = {
  ok: true,
  data: {
    session: storytellerConsolePlaceholderSession,
  },
  meta: {
    requestId: 'storyteller-console-request',
    revision: storytellerConsolePlaceholderSession.revision,
  },
};

export const storytellerConsoleConnectMessage: ConnectMessage = {
  type: 'connect',
  requestId: 'storyteller-connect-request',
  sessionId: storytellerConsoleSessionId.value,
  audience: 'storyteller',
  lastKnownRevision: storytellerConsolePlaceholderSession.revision,
};

export const storytellerConsoleBootstrapSchema = createApiSuccessEnvelopeSchema(
  z.object({
    sessionId: z.string(),
  }),
);

export const storytellerConsoleBootstrapSchemaResult = safeParseWithSchema(
  storytellerConsoleBootstrapSchema,
  {
    ok: true,
    data: {
      sessionId: storytellerConsoleSessionId.value,
    },
    meta: {
      requestId: 'storyteller-console-request',
      revision: storytellerConsolePlaceholderSession.revision,
    },
  },
);

export const storytellerConsoleConnectSchemaResult = safeParseWithSchema(
  connectMessageSchema,
  storytellerConsoleConnectMessage,
);

export const storytellerConsoleProjection: StorytellerProjection = {
  session: {
    sessionId: storytellerConsoleSessionId,
    revision: storytellerConsolePlaceholderSession.revision,
    createdAt: storytellerConsolePlaceholderSession.createdAt,
    updatedAt: storytellerConsolePlaceholderSession.updatedAt,
    phase: storytellerConsolePhase,
  },
  seats: [
    {
      seatId: {
        kind: 'seat',
        value: 'storyteller-seat-1',
      },
      position: 0,
      occupantPlayerId: {
        kind: 'player',
        value: 'storyteller-player-1',
      },
      note: null,
    },
  ],
  players: [
    {
      playerId: {
        kind: 'player',
        value: 'storyteller-player-1',
      },
      assignedSeatId: {
        kind: 'seat',
        value: 'storyteller-seat-1',
      },
      displayName: 'Player One',
      isAlive: true,
      ghostVoteAvailable: true,
      role: {
        roleId: 'washerwoman',
        roleName: 'Washerwoman',
      },
      alignment: {
        alignmentId: 'good',
        alignmentName: 'Good',
      },
      reminders: [
        {
          reminderId: 'reminder-1',
          text: 'Shown first night',
        },
      ],
      note: null,
    },
  ],
  workflow: {
    phase: storytellerConsolePhase,
    activeNomination: null,
    activeVote: null,
    timer: null,
    publicStatus: null,
  },
  selectedScript: {
    scriptId: 'tb',
    scriptName: 'Trouble Brewing',
  },
  sessionNote: null,
};

export interface StorytellerConsolePlaceholder {
  readonly domainPackage: DomainPackageMarker['packageName'];
  readonly sessionIdKind: SessionId['kind'];
  readonly phaseName: PhaseState['current'];
  readonly domainCommandsModule: DomainCommandsModuleMarker['module'];
  readonly createSessionCommandType: typeof SESSION_COMMANDS.createSession;
  readonly setPhaseCommandType: typeof PHASE_VOTE_COMMANDS.setPhase;
  readonly setPlayerNameCommandType: typeof PLAYER_COMMANDS.setPlayerName;
  readonly bootstrapRequest: typeof storytellerConsoleBootstrapRequest;
  readonly bootstrapResponse: typeof storytellerConsoleBootstrapResponse;
  readonly connectMessage: typeof storytellerConsoleConnectMessage;
  readonly bootstrapSchemaResult: typeof storytellerConsoleBootstrapSchemaResult;
  readonly connectSchemaResult: typeof storytellerConsoleConnectSchemaResult;
  readonly storytellerProjection: typeof storytellerConsoleProjection;
}
