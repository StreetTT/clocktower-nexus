import { describe, expect, it } from 'vitest';
import { ZodError } from 'zod';

import { loadGameHubConfig } from '../src/config.js';

describe('loadGameHubConfig', () => {
  it('loads the default config when no overrides are provided', () => {
    expect(loadGameHubConfig({})).toEqual({
      host: '127.0.0.1',
      port: 3000,
    });
  });

  it('parses valid host and port overrides from the environment', () => {
    expect(
      loadGameHubConfig({
        HOST: '0.0.0.0',
        PORT: '4310',
      }),
    ).toEqual({
      host: '0.0.0.0',
      port: 4310,
    });
  });

  it('fails fast on an invalid port value', () => {
    expect(() =>
      loadGameHubConfig({
        PORT: 'not-a-port',
      }),
    ).toThrow(ZodError);
  });

  it('fails fast on an out-of-range port value', () => {
    expect(() =>
      loadGameHubConfig({
        PORT: '70000',
      }),
    ).toThrow(ZodError);
  });
});
