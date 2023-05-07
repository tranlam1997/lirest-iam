import { asyncHandler } from '../../shared/helper';
import { Response, Router } from 'express';
import { ResultResponse } from '../../shared/response-format';
import { AuthService } from './auth.service';
import { RegisterRequestDTO, LoginRequestDTO } from './dto/users.dto';
import httpRequestTimer from '../../common/prometheus/metrics/request-timer';

const AuthRouter = Router();

export default (router: Router) => {
  AuthRouter.post('/register', asyncHandler(async (req: RegisterRequestDTO, res: Response) => {
    const end = httpRequestTimer.startTimer();
    const role = await AuthService.register(req.body);
    end({ route: req.originalUrl, code: res.statusCode, method: req.method });
    return ResultResponse.info(res, {
      response: {
        data: role,
      },
    });
  }));

  AuthRouter.post(
    '/login',
    asyncHandler(async (req: LoginRequestDTO, res: Response) => {
      const end = httpRequestTimer.startTimer();
      const role = await AuthService.login(req.body);
      end({ route: req.originalUrl, code: res.statusCode, method: req.method });
      return ResultResponse.info(res, {
        response: {
          data: role,
        },
      });
    }),
  );

  router.use('/auth', AuthRouter);
};
