import {
  LirestGrpcClient,
  ServiceRegistriesServiceClient,
} from '@tranlam1997/lirest-internal-communication-service';

export default new LirestGrpcClient<ServiceRegistriesServiceClient>({
  host: 'localhost:50052',
  service: ServiceRegistriesServiceClient,
}).getClient();