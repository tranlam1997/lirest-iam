import { PureAbility } from '@casl/ability';
import { Permission } from "./interfaces/abilities.interface";

export const AbilitesService = {
  async createAbilities(permissions: Permission[]) {
    return new PureAbility(permissions);
  }
};
