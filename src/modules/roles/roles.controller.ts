import { asyncHandler } from './../../shared/helper';
import { Request, Response, Router } from 'express';
import { RolesService } from './roles.service';


const RolesRouter = Router();

export default (app: Router) => {
  RolesRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
    const role = await RolesService.createRole(req.body);
    return res.status(201).json(role);
  }))

  app.use('/roles', RolesRouter);
};
