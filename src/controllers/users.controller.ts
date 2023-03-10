import { type User } from '@prisma/client';
import { Router, type Request, type Response } from 'express';
import { getUsers } from '../services/users.service';
import { NOT_FOUND, OK } from './protocols';

const userController: Router = Router();

userController.get(
	'/',
	async (_: Request, res: Response): Promise<Response> => {
		const users: User[] = await getUsers();
		try {
			return res.status(OK).json(users);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default userController;
