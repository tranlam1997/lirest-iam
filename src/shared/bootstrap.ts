import connectToDb from '@src/common/mongoose';
import { Application } from 'express';
import UtilityMiddleware from '../middlewares//utility-handler';
import RequestInspectionMiddleware from '../middlewares/request-inspection';
import ErrorHandlerMiddleware from '../middlewares/errors-handler';
import loadSwaggerUI from '../common/swagger/swagger';
import ResourceHandler from '../middlewares/resource-handler';
import setUpControllers from '../controllers';
import responseTime from '../middlewares/response-time';
import connectToKafka from '@src/common/kafka/bootstrap';
import config from 'config';

export default async function bootstrap(app: Application) {
  // connect to db
  await connectToDb();

  // load swagger ui
  loadSwaggerUI(app);

  if (config.get('kafka.enabled')) {
    // connect to kafka
    await connectToKafka();
  }
  // set up middlewares
  app.use(UtilityMiddleware);

  // log request info
  app.use(RequestInspectionMiddleware);

  // log response time
  app.use(responseTime)

  // set up apis
  setUpControllers(app);

  // handle not found resource or api
  app.use(ResourceHandler);

  // global error handler
  app.use(ErrorHandlerMiddleware);
}
