import config from 'config';

declare global {
  // eslint-disable-next-line no-var
  var serviceName: string;
}

global.serviceName = config.get<string>('service.name');

export {};