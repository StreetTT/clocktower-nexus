import type {
  DomainPackageMarker,
  PublicProjection,
} from '@clocktower-nexus/domain';
import type {
  ApiErrorEnvelope,
  ProtocolPackageMarker,
} from '@clocktower-nexus/protocol';
import {
  createProjectionUpdateMessageSchema,
  type ProjectionUpdateMessage,
} from '@clocktower-nexus/protocol/websocket';
import { z } from 'zod';

export interface PublicSquarePlaceholder {
  readonly domainPackage: DomainPackageMarker['packageName'];
  readonly protocolPackage: ProtocolPackageMarker['packageName'];
  readonly bootstrapResponse: ApiErrorEnvelope<
    'session_not_found',
    { readonly sessionId: string }
  >;
  readonly publicProjection: typeof publicSquareProjection;
  readonly socketProjectionUpdate: ProjectionUpdateMessage<
    PublicProjection,
    'public'
  >;
}

export const publicSquareBootstrapError: ApiErrorEnvelope<
  'session_not_found',
  { readonly sessionId: string }
> = {
  ok: false,
  error: {
    code: 'session_not_found',
    message: 'The requested session could not be found.',
    details: {
      sessionId: 'public-square-placeholder',
    },
  },
  meta: {
    requestId: 'public-square-request',
  },
};

export const publicSquareProjection: PublicProjection = {
  session: {
    sessionId: {
      kind: 'session',
      value: 'public-square-placeholder',
    },
    revision: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    phase: {
      current: 'setup',
    },
  },
  seats: [
    {
      seatId: {
        kind: 'seat',
        value: 'public-seat-1',
      },
      position: 0,
      displayName: 'Player One',
      isOccupied: true,
      isAlive: true,
      ghostVoteAvailable: true,
      isNominated: false,
      isVoting: false,
    },
  ],
  workflow: {
    phase: {
      current: 'setup',
    },
    activeNomination: null,
    activeVote: null,
    timer: null,
  },
  publicStatus: {
    text: 'Waiting for first night.',
  },
  selectedScript: {
    scriptId: 'tb',
    scriptName: 'Trouble Brewing',
  },
};

export const publicSquareProjectionUpdate: ProjectionUpdateMessage<
  PublicProjection,
  'public'
> = {
  type: 'projection_update',
  sessionId: 'public-square-placeholder',
  stream: 'public',
  revision: 1,
  projection: publicSquareProjection,
};

export const publicSquareActiveWorkflowProjection: PublicProjection = {
  session: {
    sessionId: {
      kind: 'session',
      value: 'public-square-placeholder',
    },
    revision: 2,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:02:00.000Z',
    phase: {
      current: 'day',
    },
  },
  seats: [
    {
      seatId: {
        kind: 'seat',
        value: 'public-seat-1',
      },
      position: 0,
      displayName: 'Player One',
      isOccupied: true,
      isAlive: true,
      ghostVoteAvailable: true,
      isNominated: false,
      isVoting: true,
    },
    {
      seatId: {
        kind: 'seat',
        value: 'public-seat-2',
      },
      position: 1,
      displayName: 'Player Two',
      isOccupied: true,
      isAlive: true,
      ghostVoteAvailable: true,
      isNominated: true,
      isVoting: false,
    },
  ],
  workflow: {
    phase: {
      current: 'day',
    },
    activeNomination: {
      nominatorSeatId: {
        kind: 'seat',
        value: 'public-seat-1',
      },
      nomineeSeatId: {
        kind: 'seat',
        value: 'public-seat-2',
      },
      isOpen: true,
    },
    activeVote: {
      nomineeSeatId: {
        kind: 'seat',
        value: 'public-seat-2',
      },
      participatingSeatIds: [
        {
          kind: 'seat',
          value: 'public-seat-1',
        },
      ],
      isOpen: true,
    },
    timer: {
      isRunning: true,
      remainingSeconds: 42,
    },
  },
  publicStatus: {
    text: 'Voting in progress.',
  },
  selectedScript: {
    scriptId: 'tb',
    scriptName: 'Trouble Brewing',
  },
};

export const publicSquareActiveWorkflowProjectionUpdate: ProjectionUpdateMessage<
  PublicProjection,
  'public'
> = {
  type: 'projection_update',
  sessionId: 'public-square-placeholder',
  stream: 'public',
  revision: 2,
  projection: publicSquareActiveWorkflowProjection,
};

export const publicSquareProjectionUpdateSchema =
  createProjectionUpdateMessageSchema(
    z.object({
      session: z.object({
        sessionId: z.object({
          kind: z.literal('session'),
          value: z.string(),
        }),
        revision: z.number().int().nonnegative(),
        createdAt: z.string(),
        updatedAt: z.string(),
        phase: z.object({
          current: z.enum(['setup', 'day', 'night']),
        }),
      }),
      seats: z.array(
        z.object({
          seatId: z.object({
            kind: z.literal('seat'),
            value: z.string(),
          }),
          position: z.number().int().nonnegative(),
          displayName: z.string().nullable(),
          isOccupied: z.boolean(),
          isAlive: z.boolean().nullable(),
          ghostVoteAvailable: z.boolean().nullable(),
          isNominated: z.boolean(),
          isVoting: z.boolean(),
        }),
      ),
      workflow: z.object({
        phase: z.object({
          current: z.enum(['setup', 'day', 'night']),
        }),
        activeNomination: z
          .object({
            nominatorSeatId: z.object({
              kind: z.literal('seat'),
              value: z.string(),
            }),
            nomineeSeatId: z.object({
              kind: z.literal('seat'),
              value: z.string(),
            }),
            isOpen: z.boolean(),
          })
          .nullable(),
        activeVote: z
          .object({
            nomineeSeatId: z.object({
              kind: z.literal('seat'),
              value: z.string(),
            }),
            participatingSeatIds: z.array(
              z.object({
                kind: z.literal('seat'),
                value: z.string(),
              }),
            ),
            isOpen: z.boolean(),
          })
          .nullable(),
        timer: z
          .object({
            isRunning: z.boolean(),
            remainingSeconds: z.number().int().nonnegative(),
          })
          .nullable(),
      }),
      publicStatus: z
        .object({
          text: z.string(),
        })
        .nullable(),
      selectedScript: z
        .object({
          scriptId: z.string(),
          scriptName: z.string(),
        })
        .nullable(),
    }),
    z.literal('public'),
  );

export const publicSquareProjectionUpdateResult =
  publicSquareProjectionUpdateSchema.safeParse(
    publicSquareActiveWorkflowProjectionUpdate,
  );
