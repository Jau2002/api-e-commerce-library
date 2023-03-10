import type { User } from '@prisma/client';
import { Router, type Request, type Response } from 'express';
import { getUsers, postUser } from '../services/users.service';
import { CREATE, NOT_FOUND, NO_CONTENT, OK } from './protocols';

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

userController.post(
	'/',
	async (req: Request, res: Response): Promise<Response> => {
		const { body } = req;

		try {
			if (Object.values(body).some((value: unknown): boolean => !value)) {
				return res
					.status(NO_CONTENT)
					.json({ message: 'lack of parameters to create user' });
			}

			const newUser: User = await postUser(body);

			return res.status(CREATE).json(newUser);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default userController;
