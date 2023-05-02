import { User } from '../interfaces/users.interface';
import BaseRepository, { BaseRepositoryResult } from '../../../base/repository';
import UserModel from '../schemas/users.schema';

export const UsersRepository = BaseRepository<User>(UserModel);
