import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { ActionsService } from './actions.service';

const ActionsRouter = Router();

export default (app: Router) => {
  ActionsRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
    const role = await ActionsService.createAction(req.body);
    return res.status(201).json(role);
  }))

  app.use('/actions', ActionsRouter);
};
