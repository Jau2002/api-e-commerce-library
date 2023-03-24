import { Router, type Request, type Response } from 'express';
import type { UpdateUser, User, UserRegister } from '../services/services';
import { findForId, getUsers, updateUser } from '../services/users.service';
import { CONFLICT, NOT_FOUND, OK } from './protocols';

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

userController.put(
	'/:id',
	async (req: Request, res: Response): Promise<Response> => {
		const { params, body } = req;

		const id: number = params.id != null ? parseInt(params.id) : 0;

		const foundUser: UserRegister = await findForId(id);

		try {
			if (!foundUser || Object.values(foundUser).length === 0) {
				return res.status(CONFLICT).json({ message: 'the user´s not exists' });
			}

			const editUser: UpdateUser = await updateUser(id, body);

			return res.status(OK).json(editUser);
		} catch (err) {
			return res.status(NOT_FOUND).json({ message: (err as Error).message });
		}
	}
);

export default userController;
