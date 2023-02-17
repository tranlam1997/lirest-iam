import { SubjectType } from '../constants/subjects.constant';
export interface Subject {
  subjectId: string;
  name: string;
  type: ValuesOf<typeof SubjectType>;
  description?: string;
}