import { Client } from './interfaces/clients.interface';
import BaseRepository from '../../base/repository';
import ClientModel from './clients.schema';

export const ClientsRepository = BaseRepository<Client>(ClientModel)
