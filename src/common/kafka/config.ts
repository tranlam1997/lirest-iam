import { KafkaConfig } from '@tranlam1997/lirest-event-pub-sub';
import config from 'config';

export const kafkaConfig: KafkaConfig = {
  serverUrl: config.get<string>('kafka.serverUrl'),
  clientId: config.get<string>('kafka.clientId'),
  sasl: {
    username: config.get<string>('kafka.sasl.username'),
    password: config.get<string>('kafka.sasl.password'),
  },
}
