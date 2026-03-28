import type { DomainPackageMarker } from '@clocktower-nexus/domain';
import type {
  ProtocolPackageMarker,
  WebSocketClientMessage,
  WebSocketServerMessage,
} from '@clocktower-nexus/protocol';

export interface GameHubPlaceholder {
  readonly domainPackage: DomainPackageMarker['packageName'];
  readonly protocolPackage: ProtocolPackageMarker['packageName'];
  readonly inboundSocketMessage: WebSocketClientMessage;
  readonly outboundSocketMessage: WebSocketServerMessage<
    { readonly privateView: true },
    { readonly publicView: true }
  >;
}
