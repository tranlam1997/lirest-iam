import { SubjectsRepository } from './subjects.repository';
import { Subject } from './interfaces/subjects.interface';
import { BadRequestException } from '../../errors/exceptions/bad-request-exception';

export const SubjectsService = {
  async createSubject(subject: Subject) {
    const existSubject = await SubjectsRepository.findOne({
      name: subject.name,
    });

    if (existSubject) {
      throw new BadRequestException('Subject already exists');
    }

    const newClient = await SubjectsRepository.create(subject);
    return newClient;
  },

  async getAllSubjects() {
    const subjects = await SubjectsRepository.findAll();
    // serviceRegistriesClient.getAllServiceRegistries({}, (err: ServiceError | null, res: GetAllServiceRegistriesResponse) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     }
    //       console.log(res);
    //   });

    return subjects;
  }
};
