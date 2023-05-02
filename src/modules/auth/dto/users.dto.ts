import { BaseBodyRequest } from "@src/base/request";
import { User } from "../interfaces/users.interface";

export interface LoginData {
  username?: string;
  email?: string;
  password: string;
}

export type LoginRequestDTO = BaseBodyRequest<LoginData>
export type RegisterRequestDTO = BaseBodyRequest<User>
