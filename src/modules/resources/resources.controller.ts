import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { ResourcesService } from './resources.service';
import { CreateResourceRequestDTO } from './dto/resources.dto';

const ResourcesRouter = Router();

export default (app: Router) => {
  ResourcesRouter.route('/')
    /**
     * Create new resource
     */
    .post(
      asyncHandler(async (req: CreateResourceRequestDTO, res: Response) => {
        const role = await ResourcesService.createResource(req.body);
        return res.status(201).json(role);
      }),
    )
    /**
     * Get all resources
     */
    .get(
      asyncHandler(async (_req: Request, res: Response) => {
        const permissions = await ResourcesService.getAllResources();
        return res.status(200).json(permissions);
      }),
    );

  app.use('/resources', ResourcesRouter);
};
