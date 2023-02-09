import { createKafkaProducer, KafkaProducer as KafkaProducerInst, KafkaProducerRecord } from '@tranlam1997/lirest-event-pub-sub';
import { kafkaConfig } from "./config";
import { Transactions } from './topics';
import { Kafkajs } from '@tranlam1997/lirest-event-pub-sub';
import {logger} from "../winston";

const KafkaLogger = logger('kafka-producer');
class KafkaProducer {
  private readonly producer: KafkaProducerInst;

  constructor() {
    this.producer = createKafkaProducer({
      kafkaConfig: { ...kafkaConfig, customGeneralKafkaConfig: { brokers: [kafkaConfig.serverUrl] } },
      producerConfig: {
        transactionalId: Transactions.USER_REGISTER,
      }
    });
  }

  public async connect() {
    KafkaLogger.info(`Connecting to Kafka Server: ${kafkaConfig.serverUrl} ...`);
    await this.producer.connect();
    KafkaLogger.info(`Connected to Kafka Server`);
  }

  public async disconnect() {
    await this.producer.disconnect();
  }

  public async send(data: KafkaProducerRecord) {
    await this.producer.send(data);
  }

  public async transaction(): Promise<Kafkajs.Transaction> {
    return await this.producer.transaction();
  }
}

export default new KafkaProducer();