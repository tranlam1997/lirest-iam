import { Permission } from './interfaces/permissions.interface';
import { PermissionsRepository } from './permissions.repository';

export const PermissionsService = {
  async createPermission(permission: Permission) {
    const newClient = await PermissionsRepository.create(permission);
    return newClient;
  },

  async getAllPermissions() {
    const actions = await PermissionsRepository.findAll();
    return actions;
  }
};
