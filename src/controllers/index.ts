import { Application, Router } from 'express';
import RolesController from '@src/modules/roles/roles.controller';
import ClientsController from '@src/modules/clients/clients.controller';
import ActionsController from '@src/modules/actions/actions.controller';
import SubjectsController from '@src/modules/subjects/subjects.controller';
import AuthController from '@src/modules/auth/auth.controller';
import config from 'config';

const router = Router();
const baseUrl = config.get<string>('service.baseUrl');

export default (app: Application) => {
  RolesController(router);
  ClientsController(router);
  ActionsController(router);
  SubjectsController(router);
  AuthController(router);
  // test server connection
  app.get(`${baseUrl}/ping`, (_req, res) => {
    res.send('Pong!');
  })
  app.use(baseUrl, router);
}