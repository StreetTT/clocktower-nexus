import type { FastifyInstance } from 'fastify';

import { registerBootstrapModule } from './bootstrap.js';
import { registerHealthModule } from './health.js';

/**
 * Registers the game hub modules in one central composition seam.
 */
export async function registerGameHubModules(
  app: FastifyInstance,
): Promise<void> {
  await app.register(registerBootstrapModule);
  await app.register(registerHealthModule);
}
