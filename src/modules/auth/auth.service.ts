import { comparePassword } from '@src/shared/helper';
import { LoginData, User } from './interfaces/users.interface';
import { UsersRepository } from './repositories/users.repository';
import { BadRequestException } from '../../errors/exceptions/bad-request-exception';
import jwt from 'jsonwebtoken';
import config from 'config';
import { randomUUID } from 'crypto';
import { KafkaTopics, TopicDestinations } from '@src/common/kafka/topics.enum';
import { logger } from '@src/common/winston';
import iamKafka from '@src/common/kafka/producer';

const AuthLogger = logger('auth-service');

export const AuthService = {
  async register(data: User) {
    await iamKafka.producer.send({
      topic: KafkaTopics.USER_REGISTER,
      messages: [
        {
          value: JSON.stringify(data),
          headers: {
            messageId: randomUUID(),
            topic: KafkaTopics.USER_REGISTER,
            origin: serviceName,
            destination: TopicDestinations.USER_SERVICE,
          }
        },
      ],
    });
    AuthLogger.info('Message sent to Kafka: ', JSON.stringify(data));
    return { success: true };
  },

  async login({ username = null, email = null, password }: LoginData) {
    const user = await UsersRepository.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = comparePassword(user.password, password);

    if (!isPasswordValid) {
      throw new BadRequestException('Password is not valid');
    }

    const accessToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      config.get<string>('jwt.accessTokenKey'),
      {
        expiresIn: config.get<string>('jwt.accessTokenExpiresIn'),
      },
    );

    const refreshToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      config.get<string>('jwt.refreshTokenKey'),
      {
        expiresIn: config.get<string>('jwt.refreshTokenExpiresIn'),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
};
