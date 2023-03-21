import type { Product } from '@prisma/client';
import { Router, type Request, type Response } from 'express';
import verifyToken from '../middlewares/verityToken';
import { deleteProduct, postProductCart } from '../services/cart.service';
import { filtreForId } from '../services/product.service';
import type { UserRegister } from '../services/services';
import { findForId } from '../services/users.service';
import { CREATE, NOT_FOUND, NO_CONTENT } from './protocols';

const cartController: Router = Router();

cartController.post(
	'/',
	verifyToken,
	async (req: Request, res: Response): Promise<Response> => {
		const userId: string = res.locals.user;

		const { productId } = req.body;

		try {
			const user: UserRegister = await findForId(parseInt(userId));

			if (!user) {
				return res.status(NOT_FOUND).json({ message: 'the user´s not exists' });
			}

			const product: Product | null = await filtreForId(parseInt(productId));

			if (!product) {
				return res
					.status(NOT_FOUND)
					.json({ message: 'the product not exists' });
			}

			const productPushed: AddProductToCartDto[] = await postProductCart(
				product.id,
				user.id
			);

			return res.status(CREATE).json(productPushed);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

cartController.delete(
	'/:productId',
	verifyToken,
	async (req: Request, res: Response): Promise<Response> => {
		const userId: string = res.locals.user;

		const { productId } = req.params;

		try {
			const user: UserRegister = await findForId(parseInt(userId));

			if (!user) {
				return res.status(NOT_FOUND).json({ message: 'the user´s not exists' });
			}

			const product: Product | null = await filtreForId(parseInt(productId!));

			if (!product) {
				return res
					.status(NOT_FOUND)
					.json({ message: 'the product not exists' });
			}

			await deleteProduct(product.id, user.id);

			return res.sendStatus(NO_CONTENT);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default cartController;
