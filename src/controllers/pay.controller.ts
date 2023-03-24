import type { AxiosResponse } from 'axios';
import { Router, type Request, type Response } from 'express';
import verifyToken from '../middlewares/verityToken';
import { getProductCart } from '../services/cart.service';
import {
	// capturePayment,
	createOrder,
	generateOrder,
} from '../services/pay.service';
import { updateProduct } from '../services/product.service';
import type {
	GetProductIdToCart,
	Product,
	UserRegister,
} from '../services/services';
import { findForId } from '../services/users.service';
import { CREATE, INTERNAL_SERVER_ERROR, NOT_FOUND } from './protocols';

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

			generateOrder(productInCart);

			const { id, stock } = productInCart?.product.map(
				({
					id,
					stock,
				}: Product): 0 | { id: number; stock: number } | undefined =>
					id && { id, stock }
			) as any;

			await updateProduct(id, stock);

			const order: AxiosResponse = await createOrder();

			return res.status(CREATE).json(order);
		} catch (err) {
			return res
				.status(INTERNAL_SERVER_ERROR)
				.json({ message: (err as Error).message });
		}
	}
);

payController.post(
	'/capture',
	verifyToken,
	async (_: Request, res: Response): Promise<Response> => {
		// const { token, PayerID } = req.body;
		try {
			// const captureData = await capturePayment(orderID);

			return res.status(CREATE).json();
		} catch (err) {
			return res
				.status(INTERNAL_SERVER_ERROR)
				.json({ message: (err as Error).message });
		}
	}
);

export default payController;
