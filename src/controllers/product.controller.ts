import type { Product } from '@prisma/client';
import { Router, type Request, type Response } from 'express';
import {
	filtreForId,
	getStockProducts,
	postProduct,
	updateProduct,
} from '../services/product.service';
import { CONFLICT, CREATE, NOT_FOUND, OK } from './protocols';

const productController: Router = Router();

productController.get(
	'/',
	async (_: Request, res: Response): Promise<Response> => {
		const products: Product[] = await getStockProducts();

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
			const product: Product = await postProduct(body);

			return res.status(CREATE).json(product);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

productController.put(
	'/:id',
	async (req: Request, res: Response): Promise<Response> => {
		const { body, params } = req;

		const id: number = params.id != null ? parseInt(params.id) : 0;

		try {
			const foundProduct: Product | null = await filtreForId(id);

			if (!foundProduct || Object.values(foundProduct).length === 0) {
				return res.status(CONFLICT).json({ message: 'the product not exists' });
			}

			const editProduct: Product = await updateProduct(id, body);

			return res.status(OK).json(editProduct);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default productController;
