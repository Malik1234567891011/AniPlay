import { buildServer } from './server.js';
import { assertProductionReady, loadConfig } from './context.js';

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

app
  .listen({ port: config.port, host: config.host })
  .then(() => {
    app.log.info(
      { environment: config.environment, modelProvider: app.ctx.modelProvider ?? 'rule-based' },
      'ANIMA API listening',
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
