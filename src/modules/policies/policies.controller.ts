import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { PoliciesService } from './policies.service';
import { CreatePolicyRequestDTO } from './dto/policies.dto';
import httpRequestTimer from '../../common/prometheus/metrics/request-timer';

const PoliciesRouter = Router();

export default (app: Router) => {
  PoliciesRouter.route('/')
    /**
     * Create new policy
     */
    .post(
      asyncHandler(async (req: CreatePolicyRequestDTO, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const role = await PoliciesService.createPolicy(req.body);
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return res.status(201).json(role);
      }),
    )
    /**
     * Get all policies
     */
    .get(
      asyncHandler(async (req: Request, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const permissions = await PoliciesService.getAllPolicies();
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return res.status(200).json(permissions);
      }),
    );

  app.use('/policies', PoliciesRouter);
};
