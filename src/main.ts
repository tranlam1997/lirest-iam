import express from 'express';
import config from 'config';
import 'reflect-metadata';
import requestTracingMiddleware from './middlewares/request-tracing';
import { logger } from './common/winston';
import { createLightship } from 'lightship';
import './shared/global/variables';
import gracefulShutdown from './shared/event-handler';

(async () => {
  const app: express.Application = express();
  const port = config.get('service.port');
  app.use(requestTracingMiddleware());
  const lightship = await createLightship();

  // Bootstrap the application
  await import('./shared/bootstrap').then(({ default: bootstrap }) => bootstrap(app));

  const server = app
    .listen(process.env.PORT || port, () => {
      logger('main').info(
        `Service running at https://${config.get('service.host')}:${process.env.PORT || port}`,
      );
      lightship.signalReady();
    })
    .on('error', () => {
      logger('main').error('Unable to start server');
      lightship.shutdown();
    });

  gracefulShutdown();

  lightship.registerShutdownHandler(() => {
    setTimeout(() => {
      server.close((err) => {
        logger('main').error('Unable to close server', err);
      });
    }, 10000);
  });
  lightship.signalReady();
})();
