import express from 'express';
import { expressLogger } from '@src/common/winston';

export const UtilityHandlerMiddlewares: any = [
  express.json(),
  express.static('public'),
  expressLogger,
];
