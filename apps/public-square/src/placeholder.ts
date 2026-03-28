import type {
  ApiErrorEnvelope,
  ProtocolPackageMarker,
} from '@clocktower-nexus/protocol';

export interface PublicSquarePlaceholder {
  readonly protocolPackage: ProtocolPackageMarker['packageName'];
  readonly bootstrapResponse: ApiErrorEnvelope<
    'session_not_found',
    { readonly sessionId: string }
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
