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
  } catch (error) {
    console.error(error);
    await app.close();
    process.exitCode = 1;
  }
}

void startGameHubServer().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
