import type { SessionId } from '../state/identifiers.js';
import type { DomainCommandType } from './command-names.js';

/**
 * Base shape for all typed domain commands.
 */
export interface DomainCommand<
  TType extends DomainCommandType = DomainCommandType,
> {
  readonly type: TType;
}

/**
 * Base shape for commands that act on a specific game session.
 */
export interface SessionScopedCommand<
  TType extends DomainCommandType = DomainCommandType,
> extends DomainCommand<TType> {
  readonly sessionId: SessionId;
}
