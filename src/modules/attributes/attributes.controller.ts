import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { AttributesService } from './attributes.service';
import { CreateAttributeRequestDTO } from './dto/attributes.dto';
import httpRequestTimer from '../../common/prometheus/metrics/request-timer';

const AttributesRouter = Router();

export default (app: Router) => {
  AttributesRouter.route('/')
    /**
     * Create new attribute
     */
    .post(
      asyncHandler(async (req: CreateAttributeRequestDTO, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const role = await AttributesService.createAttribute(req.body);
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return res.status(201).json(role);
      }),
    )
    /**
     * Get all attributes
     */
    .get(
      asyncHandler(async (req: Request, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const attributes = await AttributesService.getAllAttributes();
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return res.status(200).json(attributes);
      }),
    );

  app.use('/attributes', AttributesRouter);
};
