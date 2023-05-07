import { asyncHandler } from '@src/shared/helper';
import { Request, Response, Router } from 'express';
import { prometheus } from '@src/common/prometheus';
import httpRequestTimer from '@src/common/prometheus/metrics/request-timer';

const ActionsRouter = Router();

export default (app: Router) => {
  ActionsRouter.route('/')
    /**
     * Scrape metrics
     */
    .get(
      asyncHandler(async (req: Request, res: Response) => {
        const end = httpRequestTimer.startTimer();
        res.setHeader('Content-Type', prometheus.register.contentType);
        res.send(await prometheus.register.metrics());
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
      }),
    );

  app.use('/metrics', ActionsRouter);
};
