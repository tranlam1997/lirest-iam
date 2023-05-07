import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { ActionsService } from './actions.service';
import { CreateActionRequestDTO } from './dto/actions.dto';
import httpRequestTimer from '../../common/prometheus/metrics/request-timer';

const ActionsRouter = Router();

export default (app: Router) => {
  ActionsRouter.route('/')
    /**
     * Create new action
     */
    .post(
      asyncHandler(async (req: CreateActionRequestDTO, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const role = await ActionsService.createAction(req.body);
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return res.status(201).json(role);
      }),
    )
    /**
     * Get all actions
     */
    .get(
      asyncHandler(async (req: Request, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const actions = await ActionsService.getAllActions();
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return res.status(200).json(actions);
      }),
    );

  app.use('/actions', ActionsRouter);
};
