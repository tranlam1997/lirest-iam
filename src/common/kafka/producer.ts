import { createKafkaProducer, LirestKafkaProducer } from '@tranlam1997/lirest-event-pub-sub';
import { kafkaConfig } from "./config";


class IAMKafkaProducer {
  public readonly producer: LirestKafkaProducer;

  constructor() {
    this.producer = createKafkaProducer({
      kafkaConfig: {...kafkaConfig, customGeneralKafkaConfig: {brokers: [kafkaConfig.serverUrl]}},
    });
  }
}

export default new IAMKafkaProducer();