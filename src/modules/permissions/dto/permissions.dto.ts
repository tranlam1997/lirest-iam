import { BaseBodyRequest } from "@src/base/request";
import { Permission } from '../interfaces/permissions.interface';

export type CreatePermissionRequestDTO = BaseBodyRequest<Permission>