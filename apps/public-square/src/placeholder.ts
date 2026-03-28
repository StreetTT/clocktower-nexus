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
  readonly protocolPackage: ProtocolPackageMarker['packageName'];
  readonly bootstrapResponse: ApiErrorEnvelope<
    'session_not_found',
    { readonly sessionId: string }
  >;
  readonly socketProjectionUpdate: ProjectionUpdateMessage<
    { readonly phase: 'day' | 'night' | 'setup' },
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

export const publicSquareProjectionUpdate: ProjectionUpdateMessage<
  { readonly phase: 'day' | 'night' | 'setup' },
  'public'
> = {
  type: 'projection_update',
  sessionId: 'public-square-placeholder',
  stream: 'public',
  revision: 1,
  projection: {
    phase: 'setup',
  },
};

export const publicSquareProjectionUpdateSchema =
  createProjectionUpdateMessageSchema(
    z.object({
      phase: z.enum(['setup', 'day', 'night']),
    }),
    z.literal('public'),
  );

export const publicSquareProjectionUpdateResult =
  publicSquareProjectionUpdateSchema.safeParse(publicSquareProjectionUpdate);
