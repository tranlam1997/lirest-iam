import {
  LirestGrpcClient,
  ApiEndpointsServiceClient,
} from '@tranlam1997/lirest-internal-communication-service';

export default new LirestGrpcClient<ApiEndpointsServiceClient>({
  host: '0.0.0.0:50052',
  service: ApiEndpointsServiceClient,
}).getClient();