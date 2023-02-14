import { Action } from './interfaces/attributes.interface';
import BaseRepository from '../../base/repository';
import ClientModel from './attributes.schema';

export const ActionsRepository = BaseRepository<Action>(ClientModel)
