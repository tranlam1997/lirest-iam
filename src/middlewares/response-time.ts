import {logger} from '../common/winston';
import { BaseRequest } from '../base/request';
import { NextFunction } from 'express';
import { BaseResponse } from '@src/base/response';
import { convertNanosecondsToMilliseconds } from '@src/shared/helper';

const ResponseTimeLogger = logger('ResponseTime');

export default function responseTime(_req: BaseRequest, res: BaseResponse, next: NextFunction) {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const responseTime = convertNanosecondsToMilliseconds(Number(end - start));
    ResponseTimeLogger.info(`Response time: ${responseTime} ms`);
    res.setHeader('X-Response-Time', `${responseTime} ms`);
  });
  next();
}
