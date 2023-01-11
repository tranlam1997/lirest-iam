import express from 'express';
import config from 'config';
import 'reflect-metadata';
import { requestTracingMiddleware } from './middlewares/request-tracing';
import { logger } from './common/winston';
import { createLightship } from 'lightship';

(async () => {
  const app: express.Application = express();
  const port = config.get('service.port');
  app.use(requestTracingMiddleware())

  // Bootstrap the application
  await import('./shared/bootstrap').then(({ default: bootstrap }) => bootstrap(app));
  const lightship = await createLightship();

  const server = app.listen(process.env.PORT || port, () => {
    logger('Main').info(
      `Service running at https://${config.get('service.host')}:${process.env.PORT || port}`,
      lightship.isServerReady()
    );
  }).on('error', () => {
    logger('Main').error('Unable to start server');
    lightship.shutdown();
  });


  lightship.registerShutdownHandler(() => {
    server.close();
  });
})();
