import Fastify, {
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify';

import { registerGameHubModules } from './modules/index.js';

/**
 * Builds the reusable Fastify application instance for the game hub.
 */
export async function buildGameHubApp(
  options: FastifyServerOptions = {},
): Promise<FastifyInstance> {
  const app = Fastify({
    logger: false,
    ...options,
  });

  await registerGameHubModules(app);

  return app;
}
