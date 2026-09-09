import { buildServer } from './server.js';
import { loadConfig } from './context.js';

const config = loadConfig();
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
