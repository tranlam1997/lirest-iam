import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { ResourcesService } from './resources.service';
import { CreateResourceRequestDTO } from './dto/resources.dto';
import httpRequestTimer from '../../common/prometheus/metrics/request-timer';

const ResourcesRouter = Router();

export default (app: Router) => {
  ResourcesRouter.route('/')
    /**
     * Create new resource
     */
    .post(
      asyncHandler(async (req: CreateResourceRequestDTO, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const role = await ResourcesService.createResource(req.body);
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return res.status(201).json(role);
      }),
    )
    /**
     * Get all resources
     */
    .get(
      asyncHandler(async (req: Request, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const permissions = await ResourcesService.getAllResources();
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return res.status(200).json(permissions);
      }),
    );

  app.use('/resources', ResourcesRouter);
};
