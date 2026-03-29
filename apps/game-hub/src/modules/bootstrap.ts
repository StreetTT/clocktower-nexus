import type { FastifyInstance } from 'fastify';

/**
 * Registers the initial bootstrap route for the game hub service.
 */
export async function registerBootstrapModule(
  app: FastifyInstance,
): Promise<void> {
  app.get('/', async () => ({
    service: 'game-hub' as const,
    status: 'running' as const,
  }));
}
