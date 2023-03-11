import type { User } from '@prisma/client';
import { Router, type Request, type Response } from 'express';
import {
	findForEmail,
	findForId,
	getUsers,
	postUser,
	updateUser,
} from '../services/users.service';
import { CONFLICT, CREATE, NOT_FOUND, NO_CONTENT, OK } from './protocols';

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

			const foundUser: User | null = await findForEmail(body);

			if (foundUser) {
				throw new Error('Email already exists');
				// return res.status(CONFLICT).json({ message: 'the user´s exists' });
			}
			const newUser: User = await postUser(body);

			return res.status(CREATE).json(newUser);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

userController.put(
	'/:id',
	async (req: Request, res: Response): Promise<Response> => {
		const { params, body } = req;

		const id: number = params.id != null ? parseInt(params.id) : 0;

		const foundUser: User | null = await findForId(id);
		try {
			if (!foundUser || Object.values(foundUser).length === 0) {
				return res.status(CONFLICT).json({ message: 'the user´s not exists' });
			}

			const editUser: User = await updateUser(id, body);

			return res.status(OK).json(editUser);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default userController;
