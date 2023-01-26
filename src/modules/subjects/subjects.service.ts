import { SubjectsRepository } from './subjects.repository';
import { Subject } from './interfaces/subjects.interface';

export const SubjectsService = {
  async createSubject(subject: Subject) {
    const newClient = await SubjectsRepository.create(subject);
    return newClient;
  }
};
