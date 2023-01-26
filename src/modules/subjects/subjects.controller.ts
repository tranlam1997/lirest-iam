import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { SubjectsService } from './subjects.service';

const SubjectsRouter = Router();

export default (app: Router) => {
  SubjectsRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
    const role = await SubjectsService.createSubject(req.body);
    return res.status(201).json(role);
  }))

  app.use('/subjects', SubjectsRouter);
};
