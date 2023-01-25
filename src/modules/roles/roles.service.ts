import { Roles } from "./interfaces/roles.interface";
import { RolesRepository } from "./roles.repository";

export const RolesService = {
  async createRole(role: Roles) {
    const newRole = await RolesRepository.create(role);
    return newRole;
  }
};
