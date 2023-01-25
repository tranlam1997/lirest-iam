import { Action } from './interfaces/actions.interface';
import BaseRepository from '../../base/repository';
import ClientModel from './actions.schema';

export const ActionsRepository = BaseRepository<Action>(ClientModel)
