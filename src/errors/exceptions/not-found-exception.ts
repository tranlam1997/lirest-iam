import { HttpStatusCode } from '../error.enum';
import { HttpException } from './http-exceptions';

export class NotFoundException extends HttpException {
  constructor(objectOrError: string | Record<string, any>) {
    super(HttpException.createBody(objectOrError, HttpStatusCode.NOT_FOUND));
  }
}
