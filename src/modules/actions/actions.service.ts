import { ActionsRepository } from './actions.repository';
import { Action } from './interfaces/actions.interface';

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
