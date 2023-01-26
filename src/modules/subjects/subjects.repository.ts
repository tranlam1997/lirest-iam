import { Subject } from './interfaces/subjects.interface';
import BaseRepository from '../../base/repository';
import SubjectModel from './subjects.schema';

export const SubjectsRepository = BaseRepository<Subject>(SubjectModel)
