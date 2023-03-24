import { Router, type Request, type Response } from 'express';
import verifyToken from '../middlewares/verityToken';
import { getProductCart } from '../services/cart.service';
import { capturePayment, createOrder } from '../services/pay.service';
import type { GetProductIdToCart, UserRegister } from '../services/services';
import { findForId } from '../services/users.service';
import { CREATE, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from './protocols';

const payController: Router = Router();

payController.post(
	'/create',
	verifyToken,
	async (_: Request, res: Response): Promise<Response> => {
		const userId: string = res.locals.user;

		try {
			const user: UserRegister = await findForId(parseInt(userId));

			if (!user) {
				return res.status(NOT_FOUND).json({ message: 'the user´s not exists' });
			}

			const productInCart: GetProductIdToCart | null = await getProductCart(
				parseInt(userId)
			);

			if (!productInCart) {
				return res
					.status(NOT_FOUND)
					.json({ message: 'the product not exists in to Cart' });
			}

			await createOrder();
			return res.sendStatus(CREATE);
		} catch (err) {
			return res
				.status(INTERNAL_SERVER_ERROR)
				.json({ message: (err as Error).message });
		}
	}
);

payController.get(
	'/capture',
	async (req: Request, res: Response): Promise<Response> => {
		const { token } = req.query;
		try {
			await capturePayment(token);
			return res.sendStatus(OK);
		} catch (err) {
			return res
				.status(INTERNAL_SERVER_ERROR)
				.json({ message: (err as Error).message });
		}
	}
);

export default payController;
