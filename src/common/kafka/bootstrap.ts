import KafkaProducer from './producer';
import { logger } from '../winston';
import { kafkaConfig } from './config';

const KafkaLogger = logger('kafka-producer');

export default async function connectToKafka() {
  await KafkaProducer.connect();

  KafkaProducer.onEvent('producer.connect', () => {
    KafkaLogger.info(`Connected to Kafka Server: ${kafkaConfig.serverUrl}`);
  });

  KafkaProducer.onEvent('producer.disconnect', () => {
    KafkaLogger.info(`Disconnected from Kafka Server: ${kafkaConfig.serverUrl}`);
  });
}