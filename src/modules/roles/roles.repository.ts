import BaseRepository from '../../base/repository';
import { Role } from './interfaces/roles.interface';
import RoleModel from './roles.schema';

export const RolesRepository = BaseRepository<Role>(RoleModel)
