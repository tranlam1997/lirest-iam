import client from 'prom-client';
import { getDefaultMetrics } from './metrics/default';
import httpRequestTimer from './metrics/request-timer';

const register = new client.Registry();

client.collectDefaultMetrics(getDefaultMetrics(register));
register.registerMetric(httpRequestTimer);

export const prometheus = {
  client,
  register,
};