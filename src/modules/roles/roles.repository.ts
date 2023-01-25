import BaseRepository from '../../base/repository';
import { Roles } from './interfaces/roles.interface';
import RolesModel from './roles.schema';

export const RolesRepository = BaseRepository<Roles>(RolesModel)
