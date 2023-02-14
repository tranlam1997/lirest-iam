import { AttributesRepository } from './attributes.repository';
import { Attribute } from './interfaces/attributes.interface';

export const AttributesService = {
  async createAttribute(attribute: Attribute) {
    const newClient = await AttributesRepository.create(attribute);
    return newClient;
  },

  async getAllAttributes() {
    const attributes = await AttributesRepository.findAll();
    return attributes;
  }
};
