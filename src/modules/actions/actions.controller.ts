import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { ActionsService } from './actions.service';
import { CreateActionRequestDTO } from './dto/actions.dto';

const ActionsRouter = Router();

export default (app: Router) => {
  ActionsRouter.route('/')
    /**
     * Create new action
     */
    .post(
      asyncHandler(async (req: CreateActionRequestDTO, res: Response) => {
        const role = await ActionsService.createAction(req.body);
        return res.status(201).json(role);
      }),
    )
    /**
     * Get all actions
     */
    .get(
      asyncHandler(async (_req: Request, res: Response) => {
        const actions = await ActionsService.getAllActions();
        return res.status(200).json(actions);
      }),
    );

  app.use('/actions', ActionsRouter);
};
