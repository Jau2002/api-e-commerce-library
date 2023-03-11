import { Router } from 'express';
import signController from '../controllers/sign.controller';
import userController from '../controllers/users.controller';

const rootRouter: Router = Router();

rootRouter.use('/user', userController);

rootRouter.use('/sign', signController);

export default rootRouter;
