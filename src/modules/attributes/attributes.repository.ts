import { Attribute } from './interfaces/attributes.interface';
import BaseRepository from '../../base/repository';
import AttributeModel from './attributes.schema';

export const AttributesRepository = BaseRepository<Attribute>(AttributeModel)
