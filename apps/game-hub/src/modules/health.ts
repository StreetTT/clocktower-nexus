import type { FastifyInstance } from 'fastify';

/**
 * Registers the basic process-readiness health route for the game hub service.
 */
export async function registerHealthModule(
  app: FastifyInstance,
): Promise<void> {
  app.get('/health', async () => ({
    service: 'game-hub' as const,
    status: 'ok' as const,
  }));
}
