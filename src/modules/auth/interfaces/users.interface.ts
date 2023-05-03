export interface User {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  emailVerified?: boolean;
  subjectId: string;
}
