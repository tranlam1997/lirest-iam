import KafkaProducer from './producer';
import { logger } from '../winston';

const KafkaLogger = logger('kafka-producer');

export default async function connectToKafka() {
  try {
    await KafkaProducer.connect();
    KafkaLogger.info('Connected producer to Kafka Server')
  } catch (err) {
    KafkaLogger.error(`Error connecting to Kafka Server: ${err}`);
  }
}