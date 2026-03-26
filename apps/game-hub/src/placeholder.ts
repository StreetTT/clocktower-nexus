import type { DomainPackageMarker } from "@clocktower-nexus/domain";
import type { ProtocolPackageMarker } from "@clocktower-nexus/protocol";

export interface GameHubPlaceholder {
  readonly domainPackage: DomainPackageMarker["packageName"];
  readonly protocolPackage: ProtocolPackageMarker["packageName"];
}
