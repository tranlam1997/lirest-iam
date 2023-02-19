import {
  createKafkaProducer,
  KafkaProducer as KafkaProducerInst,
  KafkaProducerEvents,
  KafkaProducerRecord,
} from '@tranlam1997/lirest-event-pub-sub';
import { kafkaConfig } from './config';
import { Transactions } from './topics';
import { Kafkajs } from '@tranlam1997/lirest-event-pub-sub';

class KafkaProducer {
  private readonly producer: KafkaProducerInst;

  constructor() {
    this.producer = createKafkaProducer({
      kafkaConfig: {
        ...kafkaConfig,
        customGeneralKafkaConfig: {
          brokers: [kafkaConfig.serverUrl],
          logLevel: Kafkajs.logLevel.INFO,
        },
      },
      producerConfig: {
        transactionalId: Transactions.USER_REGISTER,
      },
    });
  }

  public onEvent(event: KafkaProducerEvents, callback: (data?: any) => void) {
    this.producer.on(event, callback);
  }

  public async connect() {
    await this.producer.connect();
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
