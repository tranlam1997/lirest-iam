import { comparePassword } from '@src/shared/helper';
import { User } from './interfaces/users.interface';
import { UsersRepository } from './repositories/users.repository';
import { BadRequestException } from '../../errors/exceptions/bad-request-exception';
import jwt from 'jsonwebtoken';
import config from 'config';
import { randomUUID } from 'crypto';
import { KafkaTopics, TopicDestinations } from '@src/common/kafka/topics';
import { logger } from '@src/common/winston';
import kafkaProducer from '@src/common/kafka/producer';
import { LoginData } from './dto/users.dto';
import { SubjectsRepository } from '../subjects/subjects.repository';
import mongoose from 'mongoose';

const AuthLogger = logger('auth-service');

export const AuthService = {
  async register(data: Omit<User, '_id' | 'userId'>) {
    const { subjectId = '1' } = (await SubjectsRepository.findOne({ name: 'admin' })) ?? {};
    const transaction = await kafkaProducer.transaction();
    const session = await mongoose.startSession();
    try {
      const userId = randomUUID();
      const payload = { ...data, userId, subjectId }
      session.startTransaction();
      await UsersRepository.create(payload, { session });
      AuthLogger.info(`Sending message to Kafka: ${JSON.stringify(payload)}`);
      await transaction.send({
        topic: KafkaTopics.USER_REGISTER,
        messages: [
          {
            value: JSON.stringify(payload),
            headers: {
              messageId: randomUUID(),
              topic: KafkaTopics.USER_REGISTER,
              origin: serviceName,
              destination: TopicDestinations.USER_SERVICE,
            },
          },
        ],
      });
      await transaction.commit();
      await session.commitTransaction();
      AuthLogger.info('Message sent to Kafka');
    } catch (err) {
      await session.abortTransaction();
      await transaction.abort();
      AuthLogger.error(`Error creating new user: ${JSON.stringify(err)}`);
      throw new BadRequestException({ message: 'Something went wrong', error: err });
    } finally {
      await session.endSession();
      return { success: true };
    }

  },

  async login({ username = null, email = null, password }: LoginData) {
    const user = await UsersRepository.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Password is not valid');
    }

    const accessTokenExpiredIn = config.get<string>('jwt.accessTokenExpiresIn');
    const refreshTokenExpiredIn = config.get<string>('jwt.refreshTokenExpiresIn');
    const accessTokenKey = config.get<string>('jwt.accessTokenKey');
    const refreshTokenKey = config.get<string>('jwt.refreshTokenKey');

    const accessToken = jwt.sign(
      {
        userId: user.userId,
        username: user.username,
        subjectId: user.subjectId,
        refreshTokenExpiredIn
      },
      accessTokenKey,
      {
        expiresIn: accessTokenExpiredIn,
      },
    );

    const refreshToken = jwt.sign(
      {
        userId: user.userId,
        username: user.username,
        subjectId: user.subjectId,
      },
      refreshTokenKey,
      {
        expiresIn: refreshTokenExpiredIn,
      },
    );

    return {
      userId: user._id,
      accessToken,
      refreshToken,
    };
  },
};
