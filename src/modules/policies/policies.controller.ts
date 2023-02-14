import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { PoliciesService } from './policies.service';
import { CreatePolicyRequestDTO } from './dto/policies.dto';

const PoliciesRouter = Router();

export default (app: Router) => {
  PoliciesRouter.route('/')
    /**
     * Create new policy
     */
    .post(
      asyncHandler(async (req: CreatePolicyRequestDTO, res: Response) => {
        const role = await PoliciesService.createPolicy(req.body);
        return res.status(201).json(role);
      }),
    )
    /**
     * Get all policies
     */
    .get(
      asyncHandler(async (_req: Request, res: Response) => {
        const permissions = await PoliciesService.getAllPolicies();
        return res.status(200).json(permissions);
      }),
    );

  app.use('/policies', PoliciesRouter);
};
