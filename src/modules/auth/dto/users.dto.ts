import { BaseBodyRequest } from "@src/base/request";
import { User } from "../interfaces/users.interface";

export interface LoginData {
  username: string | null;
  email: string | null;
  password: string;
}

export type LoginRequestDTO = BaseBodyRequest<LoginData>
export type RegisterRequestDTO = BaseBodyRequest<User>
