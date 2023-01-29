import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { SubjectsService } from './subjects.service';
import { ResultResponse } from '../../shared/response-format';

const SubjectsRouter = Router();

export default (app: Router) => {
  SubjectsRouter.route('/')
    .post(
      asyncHandler(async (req: Request, res: Response) => {
        const subject = await SubjectsService.createSubject(req.body);
        return ResultResponse.info(res, {
          response: {
            data: subject,
          },
        });
      }),
    )
    .get(
      asyncHandler(async (_req: Request, res: Response) => {
        const subjects = await SubjectsService.getAllSubjects();
        return ResultResponse.info(res, {
          response: {
            data: subjects,
          },
        });
      }),
    );

  app.use('/subjects', SubjectsRouter);
};
