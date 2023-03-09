import { Router } from 'express';
import userController from '../controllers/users.controller';

const rootRouter: Router = Router();

rootRouter.use('/user', userController);

export default rootRouter;
