import { Router, type Request, type Response } from 'express';
import { getUser } from '../services/users.service';
import { NOT_FOUND, OK } from './protocols';

const userController: Router = Router();

userController.get('', (_: Request, res: Response): Response => {
	try {
		return res.status(OK).send(getUser());
	} catch (err) {
		return res.status(NOT_FOUND).send({ message: (err as Error).message });
	}
});

export default userController;
