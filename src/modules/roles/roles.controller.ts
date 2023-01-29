import { asyncHandler } from './../../shared/helper';
import { Request, Response, Router } from 'express';
import { RolesService } from './roles.service';

const RolesRouter = Router();

export default (app: Router) => {
  RolesRouter.route('/')
    .post(
      asyncHandler(async (req: Request, res: Response) => {
        const role = await RolesService.createRole(req.body);
        return res.status(201).json(role);
      }),
    )
    .get(
      asyncHandler(async (_req: Request, res: Response) => {
        const roles = await RolesService.getAllRoles();
        return res.status(200).json(roles);
      }),
    );

  RolesRouter.route('/:roleId/permissions')
    .post(
      asyncHandler(async (req: Request, res: Response) => {
        const role = await RolesService.assignPermissions(req.params.roleId, req.body.permissions);
        return res.status(200).json(role);
      }),
    );

  app.use('/roles', RolesRouter);
};
