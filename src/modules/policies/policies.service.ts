import { PoliciesRepository } from './policies.repository';
import { Policy } from './interfaces/policies.interface';

export const PoliciesService = {
  async createPolicy(policy: Policy) {
    const newClient = await PoliciesRepository.create(policy);
    return newClient;
  },

  async getAllPolicies() {
    const policies = await PoliciesRepository.findAll();
    return policies;
  }
};
