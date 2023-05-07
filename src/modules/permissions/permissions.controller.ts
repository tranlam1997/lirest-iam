import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { PermissionsService } from './permissions.service';
import { CreatePermissionRequestDTO } from './dto/permissions.dto';
import httpRequestTimer from '../../common/prometheus/metrics/request-timer';

const PermissionsRouter = Router();

export default (app: Router) => {

  PermissionsRouter.route('/')
    /**
    * Create new permission
    */
    .post(
      asyncHandler(async (req: CreatePermissionRequestDTO, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const role = await PermissionsService.createPermission(req.body);
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return res.status(201).json(role);
      }),
    )
    /**
     * Get all permissions
     */
    .get(
      asyncHandler(async (req: Request, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const permissions = await PermissionsService.getAllPermissions();
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return res.status(200).json(permissions);
      }),
    );

  app.use('/permissions', PermissionsRouter);
};
