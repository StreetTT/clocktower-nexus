import Fastify, {
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify';

import { registerGameHubErrorHandling } from './errors.js';
import { registerGameHubModules } from './modules/index.js';

/**
 * Builds the reusable Fastify application instance for the game hub.
 */
export async function buildGameHubApp(
  options: FastifyServerOptions = {},
): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true,
    ...options,
  });

  await registerGameHubErrorHandling(app);
  await registerGameHubModules(app);

  return app;
}
