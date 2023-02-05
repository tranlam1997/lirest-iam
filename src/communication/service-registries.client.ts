import {
  LirestGrpcClient,
  ServiceRegistriesServiceClient,
} from '@tranlam1997/lirest-internal-communication-service';

export default new LirestGrpcClient<ServiceRegistriesServiceClient>({
  host: '0.0.0.0:50052',
  service: ServiceRegistriesServiceClient,
}).getClient();