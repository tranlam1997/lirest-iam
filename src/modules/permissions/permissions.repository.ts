import { Permission } from './interfaces/permissions.interface';
import BaseRepository from '../../base/repository';
import PermissionModel from './permissions.schema';

export const PermissionsRepository = BaseRepository<Permission>(PermissionModel)
