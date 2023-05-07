import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { SubjectsService } from './subjects.service';
import { ResultResponse } from '../../shared/response-format';
import { CreateSubjectRequestDTO } from './dto/subjects.dto';
import httpRequestTimer from '../../common/prometheus/metrics/request-timer';

const SubjectsRouter = Router();

export default (app: Router) => {
  // Create new subject
  SubjectsRouter.route('/')
    .post(
      asyncHandler(async (req: CreateSubjectRequestDTO, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const subject = await SubjectsService.createSubject(req.body);
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return ResultResponse.info(res, {
          response: {
            data: subject,
          },
        });
      }),
    )
    // Get all subjects
    .get(
      asyncHandler(async (req: Request, res: Response) => {
        const end = httpRequestTimer.startTimer();
        const subjects = await SubjectsService.getAllSubjects();
        end({ route: req.originalUrl, code: res.statusCode, method: req.method });
        return ResultResponse.info(res, {
          response: {
            data: subjects,
          },
        });
      }),
    );

  app.use('/subjects', SubjectsRouter);
};
