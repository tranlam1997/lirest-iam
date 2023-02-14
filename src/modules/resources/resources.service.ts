import { ResourcesRepository } from './resources.repository';
import { Resource } from './interfaces/resources.interface';

export const ResourcesService = {
  async createResource(resource: Resource) {
    const newClient = await ResourcesRepository.create(resource);
    return newClient;
  },

  async getAllResources() {
    const resources = await ResourcesRepository.findAll();
    return resources;
  }
};
