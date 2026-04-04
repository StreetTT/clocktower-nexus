import { z } from 'zod';

const gameHubConfigSchema = z.object({
  HOST: z.string().trim().min(1).default('127.0.0.1'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

export type GameHubConfig = {
  readonly host: string;
  readonly port: number;
};

export function loadGameHubConfig(
  env: NodeJS.ProcessEnv = process.env,
): GameHubConfig {
  const parsedConfig = gameHubConfigSchema.parse(env);

  return {
    host: parsedConfig.HOST,
    port: parsedConfig.PORT,
  };
}
