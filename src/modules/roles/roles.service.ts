import { Permission } from "../abilities/interfaces/abilities.interface";
import { Role } from "./interfaces/roles.interface";
import { RolesRepository } from "./roles.repository";
import { BadRequestException } from '../../errors/exceptions/bad-request-exception';

export const RolesService = {
  async createRole(role: Role) {
    const newRole = await RolesRepository.create(role);
    return newRole;
  },

  async getAllRoles() {
    const roles = await RolesRepository.findAll();
    return roles;
  },

  async assignPermissions(roleId: string, permissions: Permission[]) {
    const role = await RolesRepository.findOne({
      where: { id: roleId },
    });

    if(!role) throw new BadRequestException('Role not found');

    await RolesRepository.updateById(roleId, {
      permissions
    });

    return role;
  }
};
