import cls from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

const requestTracingNamespace = cls.createNamespace('request-tracing');

export const requestTracingMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    requestTracingNamespace.bindEmitter(req);
    requestTracingNamespace.bindEmitter(res);

    const tracingId = req.header('X-Tracing-Id') || crypto.randomUUID();

    requestTracingNamespace.run(() => {
      requestTracingNamespace.set('tracingId', tracingId);
      next();
    });
  };
};