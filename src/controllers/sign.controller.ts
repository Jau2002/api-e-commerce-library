import type { User } from '@prisma/client';
import { Router, type Request, type Response } from 'express';
import signToken from '../middlewares/signToken';
import verifyToken from '../middlewares/verityToken';
import type { UserRegister } from '../services/services';
import { findForEmail, findUserAuth, postUser } from '../services/sign.service';
import { findForId } from '../services/users.service';
import { CONFLICT, CREATE, NOT_FOUND, OK, UNAUTHORIZED } from './protocols';

const signController: Router = Router();

signController.post(
	'/up',
	async (req: Request, res: Response): Promise<Response | any> => {
		const { body } = req;

		const foundUser: User | null = await findForEmail(body);
		try {
			if (foundUser) {
				return res.status(CONFLICT).json({ message: 'the user´s exists' });
			}
			const newUser: User = await postUser(body);

			res.locals.user = newUser;

			signToken(req, res, (): Response => {
				return res.status(CREATE).json({ auth: true, token: res.locals.token });
			});
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

signController.get(
	'/me',
	verifyToken,
	async (_: Request, res: Response): Promise<Response> => {
		const id: string = res.locals.user;
		try {
			const foundUser: UserRegister = await findForId(parseInt(id));

			if (!foundUser) {
				return res.status(NOT_FOUND).json({ message: 'the user´s not exists' });
			}

			return res.status(OK).json(foundUser);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

signController.post(
	'/in',
	async (req: Request, res: Response): Promise<Response | any> => {
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

			res.locals.user = user;

			signToken(req, res, (): Response => {
				return res.status(OK).json({ auth: true, token: res.locals.token });
			});
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default signController;
