import { buildGameHubApp } from './app.js';

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 3000;

/**
 * Starts the game hub HTTP server for local development.
 */
async function startGameHubServer(): Promise<void> {
  const app = await buildGameHubApp();
  const host = process.env.HOST ?? DEFAULT_HOST;
  const port = Number(process.env.PORT ?? DEFAULT_PORT);

  try {
    await app.listen({
      host,
      port,
    });
  } catch (error) {
    console.error(error);
    await app.close();
    process.exitCode = 1;
  }
}

void startGameHubServer();
