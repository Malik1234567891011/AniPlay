import { buildServer } from './server.js';
import { assertProductionReady, loadConfig } from './context.js';
import { PostgresRepository } from './repo/postgres.js';

const config = loadConfig();

// Before anything binds a port: a production process with development auth
// would hand every account to anyone who knows a user id.
try {
  assertProductionReady(config);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const app = buildServer({ logger: true });

// A database that is unreachable should stop the process here, not on the first
// player's first turn.
const ready =
  app.ctx.repo instanceof PostgresRepository
    ? app.ctx.repo.ping().catch((error: unknown) => {
        app.log.error(error, 'Cannot reach DATABASE_URL');
        process.exit(1);
      })
    : Promise.resolve();

ready
  .then(() => app.listen({ port: config.port, host: config.host }))
  .then(() => {
    app.log.info(
      {
        environment: config.environment,
        modelProvider: app.ctx.modelProvider ?? 'rule-based',
        persistence: app.ctx.repo instanceof PostgresRepository ? 'postgres' : 'in-process',
        auth: app.ctx.auth.name,
      },
      'Plotbreak API listening',
    );
  })
  .catch((error) => {
    app.log.error(error, 'Failed to start');
    process.exit(1);
  });

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    void app.close().then(() => process.exit(0));
  });
}
