import { asyncHandler } from '../../shared/helper';
import { Response, Router } from 'express';
import { ResultResponse } from '../../shared/response-format';
import { AuthService } from './auth.service';
import { LoginRequestBody, RegisterRequestBody } from './interfaces/users.interface';

const AuthRouter = Router();

export default (router: Router) => {
  AuthRouter.post('/register', asyncHandler(async (req: RegisterRequestBody, res: Response) => {
    const role = await AuthService.register(req.body);
    return ResultResponse.info(res, {
      response: {
        data: role,
      },
    });
  }));

  AuthRouter.post(
    '/login',
    asyncHandler(async (req: LoginRequestBody, res: Response) => {
      const role = await AuthService.login(req.body);

      return ResultResponse.info(res, {
        response: {
          data: role,
        },
      });
    }),
  );

  router.use('/auth', AuthRouter);
};
