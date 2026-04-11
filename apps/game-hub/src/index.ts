import { buildGameHubApp } from './app.js';
import { loadGameHubConfig } from './config.js';

/**
 * Starts the game hub HTTP server for local development.
 */
async function startGameHubServer(): Promise<void> {
  const config = loadGameHubConfig();
  const app = await buildGameHubApp();

  try {
    await app.listen({
      host: config.host,
      port: config.port,
    });
    app.log.info(
      {
        host: config.host,
        port: config.port,
      },
      'Game hub listening',
    );
  } catch (error) {
    app.log.error({ err: error }, 'Game hub startup failed');
    await app.close();
    process.exitCode = 1;
  }
}

void startGameHubServer().catch((error: unknown) => {
  console.error(
    JSON.stringify({
      level: 'error',
      msg: 'Game hub failed before the Fastify logger was ready.',
      err:
        error instanceof Error
          ? {
              name: error.name,
              message: error.message,
            }
          : error,
    }),
  );
  process.exitCode = 1;
});
