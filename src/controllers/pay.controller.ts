import { Router, type Request, type Response } from 'express';
import { NOT_FOUND } from './protocols';

const payController: Router = Router();

payController.get(
	'/',
	async (req: Request, res: Response): Promise<Response> => {
		try {
			return res;
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default payController;
