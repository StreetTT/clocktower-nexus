import { afterEach, describe, expect, it } from 'vitest';

import { buildGameHubApp } from '../src/app.js';

const startedApps: Array<Awaited<ReturnType<typeof buildGameHubApp>>> = [];

afterEach(async () => {
  await Promise.all(
    startedApps.splice(0).map(async (app) => {
      await app.close();
    }),
  );
});

describe('buildGameHubApp', () => {
  it('reaches ready state and closes cleanly', async () => {
    const app = await buildGameHubApp();
    startedApps.push(app);

    await expect(app.ready()).resolves.toBe(app);
  });

  it('registers the bootstrap route through the module registry', async () => {
    const app = await buildGameHubApp();
    startedApps.push(app);

    const response = await app.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      service: 'game-hub',
      status: 'running',
    });
  });

  it('registers the health route through the module registry', async () => {
    const app = await buildGameHubApp();
    startedApps.push(app);

    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      service: 'game-hub',
      status: 'ok',
    });
  });
});
