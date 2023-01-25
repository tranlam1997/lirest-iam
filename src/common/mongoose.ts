import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';
import { logger } from './winston';

const mongooseOptions = {
  autoIndex: false,
  maxPoolSize: 10,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
} as ConnectOptions;

export default async function connectToDatabase() {
  logger('mongoose').info('Connecting to MongoDB...');
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.get('mongodb.uri'), mongooseOptions);
    logger('mongoose').info('Connected to MongoDB');
  } catch (error) {
    const timeToRetry = 5000;
    logger('mongoose').error(`Error connecting to MongoDB ${error} - Retrying in ${timeToRetry / 1000} seconds`);
    const interval = setInterval(async () => {
      try {
        await mongoose.connect(config.get('mongodb.uri'), mongooseOptions);
        logger('mongoose').info('Connected to MongoDB');
        clearInterval(interval);
      } catch (error) {
        logger('mongoose').error(`Error connecting to MongoDB ${error} - Retrying in ${timeToRetry / 1000} seconds`);
      }
    }, timeToRetry);
  }
}
