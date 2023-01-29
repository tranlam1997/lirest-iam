import { Request } from 'express';

export interface BaseRequest extends Request {
  [k: string]: any;
}

export type BaseBodyRequest<T extends Record<string, any> = Record<string, any>> = Request<
  Record<string, never>,
  Record<string, never>,
  T
>;
