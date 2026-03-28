import type { DomainPackageMarker } from '@clocktower-nexus/domain';
import {
  createWebSocketServerMessageSchema,
  parseWithSchema,
  type ProtocolPackageMarker,
  type WebSocketClientMessage,
  type WebSocketServerMessage,
} from '@clocktower-nexus/protocol';
import { z } from 'zod';

export const gameHubServerMessageSchema = createWebSocketServerMessageSchema({
  storytellerProjectionSchema: z.object({
    privateView: z.literal(true),
  }),
  publicProjectionSchema: z.object({
    publicView: z.literal(true),
  }),
});

export const gameHubOutboundSocketMessage: WebSocketServerMessage<
  { readonly privateView: true },
  { readonly publicView: true }
> = {
  type: 'socket_error',
  error: {
    code: 'subscription_required',
    message: 'The client must subscribe before receiving updates.',
  },
  sessionId: 'game-hub-placeholder',
  recoverable: true,
};

export const gameHubParsedSocketMessage = parseWithSchema(
  gameHubServerMessageSchema,
  gameHubOutboundSocketMessage,
);

export interface GameHubPlaceholder {
  readonly domainPackage: DomainPackageMarker['packageName'];
  readonly protocolPackage: ProtocolPackageMarker['packageName'];
  readonly inboundSocketMessage: WebSocketClientMessage;
  readonly outboundSocketMessage: typeof gameHubOutboundSocketMessage;
  readonly parsedSocketMessage: typeof gameHubParsedSocketMessage;
}
