import { ActionsRepository } from './attributes.repository';
import { Action } from './interfaces/attributes.interface';

export const ActionsService = {
  async createAction(action: Action) {
    const newClient = await ActionsRepository.create(action);
    return newClient;
  },

  async getAllActions() {
    const actions = await ActionsRepository.findAll();
    return actions;
  }
};
