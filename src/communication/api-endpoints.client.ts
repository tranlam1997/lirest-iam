import {
  LirestGrpcClient,
  ApiEndpointsServiceClient,
} from '@tranlam1997/lirest-internal-communication-service';

export default new LirestGrpcClient<ApiEndpointsServiceClient>({
  host: 'localhost:50052',
  service: ApiEndpointsServiceClient,
}).getClient();