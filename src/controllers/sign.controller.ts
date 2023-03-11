import type { User } from '@prisma/client';
import { Router, type Request, type Response } from 'express';
import { findForEmail, postUser } from '../services/sign.service';
import { CONFLICT, CREATE, NOT_FOUND, NO_CONTENT } from './protocols';

const signController: Router = Router();

signController.post(
	'/up',
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
				return res.status(CONFLICT).json({ message: 'the user´s exists' });
			}
			const newUser: User = await postUser(body);

			return res.status(CREATE).json(newUser);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default signController;
