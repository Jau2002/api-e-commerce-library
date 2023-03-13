import { Router } from 'express';
import cartController from '../controllers/cart.controller';
import productController from '../controllers/product.controller';
import signController from '../controllers/sign.controller';
import userController from '../controllers/users.controller';

const rootRouter: Router = Router();

rootRouter.use('/user', userController);

rootRouter.use('/sign', signController);

rootRouter.use('/product', productController);

rootRouter.use('/cart', cartController);

export default rootRouter;
