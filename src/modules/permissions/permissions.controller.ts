import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { PermissionsService } from './permissions.service';
import { CreatePermissionRequestDTO } from './dto/permissions.dto';

const PermissionsRouter = Router();

export default (app: Router) => {

  PermissionsRouter.route('/')
    /**
    * Create new permission
    */
    .post(
      asyncHandler(async (req: CreatePermissionRequestDTO, res: Response) => {
        const role = await PermissionsService.createPermission(req.body);
        return res.status(201).json(role);
      }),
    )
    /**
     * Get all permissions
     */
    .get(
      asyncHandler(async (_req: Request, res: Response) => {
        const permissions = await PermissionsService.getAllPermissions();
        return res.status(200).json(permissions);
      }),
    );

  app.use('/permissions', PermissionsRouter);
};
