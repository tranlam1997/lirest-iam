// import AuthRoutes from './auth';
import express from 'express';
import config from 'config';
import { openAPISpecification, swaggerUIOptions } from '@src/common/swagger/swagger-config';
import swaggerUI from 'swagger-ui-express';
import basicAuth from '../middlewares/basic-auth';
import { ErrorHandlerMiddlewares } from '../middlewares/errors-handler';
import { UtilityHandlerMiddlewares } from '@src/middlewares/utility-handler';

const baseUrl = config.get('service.path');

export default (app: express.Application): void => {
  app.use(UtilityHandlerMiddlewares);
  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });
  app.get(`${baseUrl}/ping`, (_req, res) => {
    res.send('pong');
  });
  app.use('/api-docs', swaggerUI.serve, [
    basicAuth,
    swaggerUI.setup(openAPISpecification, swaggerUIOptions),
  ]);
  // app.use(`${baseUrl}/auth`, AuthRoutes());
  app.use(ErrorHandlerMiddlewares);
};
