import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { SubjectsService } from './subjects.service';
import { ResultResponse } from '../../shared/response-format';
import { CreateSubjectRequestDTO } from './dto/subjects.dto';

const SubjectsRouter = Router();

export default (app: Router) => {
  // Create new subject
  SubjectsRouter.route('/')
    .post(
      asyncHandler(async (req: CreateSubjectRequestDTO, res: Response) => {
        const subject = await SubjectsService.createSubject(req.body);
        return ResultResponse.info(res, {
          response: {
            data: subject,
          },
        });
      }),
    )
    // Get all subjects
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
