import { Router, type Request, type Response } from 'express';
import { getStackProducts } from '../services/product.service';
import { NOT_FOUND, OK } from './protocols';

const productController: Router = Router();

productController.get(
	'/',
	async (_: Request, res: Response): Promise<Response> => {
		const products = await getStackProducts();

		try {
			return res.status(OK).json(products);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default productController;
