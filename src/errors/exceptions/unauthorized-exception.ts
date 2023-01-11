import { HttpStatusCode } from '../error.enum';
import { HttpException } from './http-exceptions';

export class UnauthorizedException extends HttpException {
  constructor(objectOrError: string | Record<string, any>) {
    super(HttpException.createBody(objectOrError, HttpStatusCode.UNAUTHORIZED));
  }
}
