import type { SessionId } from '../state/identifiers.js';
import type { DomainCommandType } from './command-names.js';

export interface DomainCommand<
  TType extends DomainCommandType = DomainCommandType,
> {
  readonly type: TType;
}

export interface SessionScopedCommand<
  TType extends DomainCommandType = DomainCommandType,
> extends DomainCommand<TType> {
  readonly sessionId: SessionId;
}
