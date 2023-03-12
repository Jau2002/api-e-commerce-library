import type { Product } from '@prisma/client';
import { Router, type Request, type Response } from 'express';
import { getStackProducts, postProduct } from '../services/product.service';
import { CREATE, NOT_FOUND, NO_CONTENT, OK } from './protocols';

const productController: Router = Router();

productController.get(
	'/',
	async (_: Request, res: Response): Promise<Response> => {
		const products: Product[] = await getStackProducts();

		try {
			return res.status(OK).json(products);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

productController.post(
	'/',
	async (req: Request, res: Response): Promise<Response> => {
		const { body } = req;

		try {
			if (Object.values(body).some((value: unknown): boolean => !value)) {
				return res
					.status(NO_CONTENT)
					.json({ message: 'lack of parameters to create user' });
			}

			const product: Product = await postProduct(body);

			return res.status(CREATE).json(product);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default productController;
