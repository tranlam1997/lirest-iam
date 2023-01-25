import { asyncHandler } from '../../shared/helper';
import { Request, Response, Router } from 'express';
import { ClientsService } from './clients.service';

const ClientsRouter = Router();

export default (app: Router) => {
  ClientsRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
    const role = await ClientsService.createClient(req.body);
    return res.status(201).json(role);
  }))

  app.use('/clients', ClientsRouter);
};
