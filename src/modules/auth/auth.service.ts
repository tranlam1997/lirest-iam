import { comparePassword } from '@src/shared/helper';
import { LoginData, User } from './interfaces/users.interface';
import { UsersRepository } from './repositories/users.repository';
import { BadRequestException } from '../../errors/exceptions/bad-request-exception';
import jwt from 'jsonwebtoken';
import config from 'config';

export const AuthService = {
  async register(data: User) {
    const user = await UsersRepository.create(data);
    return user;
  },

  async login({username = null, email = null, password}: LoginData) {
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
