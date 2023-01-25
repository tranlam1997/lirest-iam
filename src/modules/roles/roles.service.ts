import { Role } from "./interfaces/roles.interface";
import { RolesRepository } from "./roles.repository";

export const RolesService = {
  async createRole(role: Role) {
    const newRole = await RolesRepository.create(role);
    return newRole;
  }
};
