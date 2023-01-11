import { Application } from 'express';
// import { connectToDb } from '../common/typeorm';
import setUpRoutes from '../routes';

export default async function bootstrap(app: Application) {
  // connect to database
  // await connectToDb();
  // set up routes
  setUpRoutes(app);
}