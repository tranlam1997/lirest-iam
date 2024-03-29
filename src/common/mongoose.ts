import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';
import { logger } from './winston';

const mongooseOptions = {
  autoIndex: false,
  maxPoolSize: 10,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  dbName: 'lirest',
} as ConnectOptions;

const DbLogger = logger('mongoose');

export default async function connectToDatabase() {
  DbLogger.info('Connecting to MongoDB...');
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.get('mongodb.uri'), mongooseOptions);
    DbLogger.info(`Connected to MongoDB: ${config.get('mongodb.uri')}`);
  } catch (error) {
    const timeToRetry = 5000;
    DbLogger.error(`Error connecting to MongoDB ${'mongodb.uri'} - Error: ${error} - Retrying in ${timeToRetry / 1000} seconds`);
    const interval = setInterval(async () => {
      try {
        await mongoose.connect(config.get('mongodb.uri'), mongooseOptions);
        DbLogger.info(`Connected to MongoDB: ${config.get('mongodb.uri')}`);
        clearInterval(interval);
      } catch (error) {
        DbLogger.error(`Error connecting to MongoDB: ${'mongodb.uri'} - Error: ${error} - Retrying in ${timeToRetry / 1000} seconds`);
      }
    }, timeToRetry);
  }
}
