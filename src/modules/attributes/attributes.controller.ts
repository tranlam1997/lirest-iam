import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { AttributesService } from './attributes.service';
import { CreateAttributeRequestDTO } from './dto/attributes.dto';

const AttributesRouter = Router();

export default (app: Router) => {
  AttributesRouter.route('/')
    /**
     * Create new attribute
     */
    .post(
      asyncHandler(async (req: CreateAttributeRequestDTO, res: Response) => {
        const role = await AttributesService.createAttribute(req.body);
        return res.status(201).json(role);
      }),
    )
    /**
     * Get all attributes
     */
    .get(
      asyncHandler(async (_req: Request, res: Response) => {
        const attributes = await AttributesService.getAllAttributes();
        return res.status(200).json(attributes);
      }),
    );

  app.use('/actions', AttributesRouter);
};
