import { BaseBodyRequest } from '../../../base/request';
export interface User {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  emailVerified?: boolean;
  role: any;
}

export interface LoginData {
  username: string | null;
  email: string | null;
  password: string;
}

export type LoginRequestBody = BaseBodyRequest<LoginData>

export type RegisterRequestBody = BaseBodyRequest<User>