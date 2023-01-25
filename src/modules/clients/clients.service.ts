import { ClientsRepository } from "./clients.repository";
import { Client } from "./interfaces/clients.interface";

export const ClientsService = {
  async createClient(client: Client) {
    const newClient = await ClientsRepository.create(client);
    return newClient;
  }
};
