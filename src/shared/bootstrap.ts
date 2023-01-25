import connectToDb from '@src/common/mongoose';
import { Application } from 'express';
import UtilityMiddleware from '../middlewares//utility-handler';
import RequestInspectionMiddleware from '../middlewares/request-inspection';
import ErrorHandlerMiddleware from '../middlewares/errors-handler';
import loadSwaggerUI from '../common/swagger/swagger';
import ResourceHandler from '../middlewares/resource-handler';
import setUpControllers from '../controllers';
import responseTime from '../middlewares/response-time';

export default async function bootstrap(app: Application) {
  // connect to db
  await connectToDb();
  // load swagger ui
  loadSwaggerUI(app);
  // set up middlewares
  app.use(UtilityMiddleware);
  app.use(RequestInspectionMiddleware);
  app.use(responseTime)
  // set up apis
  setUpControllers(app);
  app.use(ResourceHandler);
  app.use(ErrorHandlerMiddleware);
}
