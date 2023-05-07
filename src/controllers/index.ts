import { Application, Router } from 'express';
import ActionsController from '@src/modules/actions/actions.controller';
import SubjectsController from '@src/modules/subjects/subjects.controller';
import AuthController from '@src/modules/auth/auth.controller';
import AttributesController from '@src/modules/attributes/attributes.controller';
import ResourcesController from '@src/modules/resources/resources.controller';
import PermissionsController from '@src/modules/permissions/permissions.controller';
import PoliciesController from '@src/modules/policies/policies.controller';
import MetricsController from '@src/controllers/metrics-collector';
import httpRequestTimer from '@src/common/prometheus/metrics/request-timer';
import config from 'config';
import cors from 'cors';

const router = Router();
const baseUrl = config.get<string>('service.baseUrl');

export default (app: Application) => {
  app.use(cors({
    origin: '*',
  }))
  ActionsController(router);
  SubjectsController(router);
  AuthController(router);
  AttributesController(router);
  ResourcesController(router);
  PermissionsController(router);
  PoliciesController(router);
  MetricsController(router);
  // test server connection
  app.get(`${baseUrl}/ping`, (req, res) => {
    const end = httpRequestTimer.startTimer();
    res.send('Pong!');
    end({ route: req.route.path, code: res.statusCode, method: req.method });
  })
  app.use(baseUrl, router);
}