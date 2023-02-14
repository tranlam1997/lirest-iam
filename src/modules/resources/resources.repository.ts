import BaseRepository from '../../base/repository';
import ResourceModel from './resources.schema';
import { Resource } from './interfaces/resources.interface';

export const ResourcesRepository = BaseRepository<Resource>(ResourceModel)
