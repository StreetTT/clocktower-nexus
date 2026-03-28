export type { DomainCommandsModuleMarker } from './commands.js';
export type { DomainEventsModuleMarker } from './events.js';
export type { DomainProjectorsModuleMarker } from './projectors.js';
export type { DomainReducersModuleMarker } from './reducers.js';
export type { DomainStateModuleMarker } from './state.js';

export interface DomainPackageMarker {
  readonly packageName: 'domain';
}
