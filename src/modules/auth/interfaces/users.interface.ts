export interface User {
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
