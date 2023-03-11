import type { User } from '@prisma/client';
import { Router, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { findForEmail, findUserAuth, postUser } from '../services/sign.service';
import { findForId } from '../services/users.service';
import type { JwtPayload } from '../types';
import {
	CONFLICT,
	CREATE,
	NOT_FOUND,
	NO_CONTENT,
	OK,
	UNAUTHORIZED,
} from './protocols';

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

			const token: string = jwt.sign(
				{ id: newUser.id },
				process.env.JWT_SECRET_KEY!,
				{ expiresIn: 60 * 60 * 24 }
			);

			return res.status(CREATE).json({ auth: true, token });
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

signController.get(
	'/me',
	async (req: Request, res: Response): Promise<Response> => {
		const accessToken: string | string[] | undefined =
			req.headers['x-access-token'];

		if (!accessToken) {
			res
				.status(UNAUTHORIZED)
				.json({ auth: false, message: 'No token provided' });
		}

		const token: string | false =
			typeof accessToken === 'string' && accessToken;

		try {
			const { id } = jwt.verify(
				token.toString(),
				process.env.JWT_SECRET_KEY!
			) as JwtPayload;

			const foundUser: User | null = await findForId(parseInt(id));

			if (!foundUser) {
				res.status(NOT_FOUND).json({ message: 'the user´s not exists' });
			}

			const user = {
				id: foundUser?.id,
				name: foundUser?.name,
				email: foundUser?.email,
			};

			return res.status(OK).json(user);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

signController.post(
	'/in',
	async (req: Request, res: Response): Promise<Response> => {
		const { body } = req;
		const foundUser: User | null = await findForEmail(body);
		try {
			if (!foundUser) {
				return res.status(NOT_FOUND).json({ message: 'the user´s not exists' });
			}

			const user: User | null = await findUserAuth(body);

			if (!user) {
				res
					.status(UNAUTHORIZED)
					.json({ auth: false, message: 'token is invalid' });
			}

			const token: string = jwt.sign(
				{ id: user?.id },
				process.env.JWT_SECRET_KEY!,
				{ expiresIn: 60 * 60 * 24 }
			);

			return res.status(OK).json({ auth: true, token });
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default signController;
