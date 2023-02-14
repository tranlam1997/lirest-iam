import { Policy } from './interfaces/policies.interface';
import BaseRepository from '../../base/repository';
import PolicyModel from './policies.schema';

export const PoliciesRepository = BaseRepository<Policy>(PolicyModel)
