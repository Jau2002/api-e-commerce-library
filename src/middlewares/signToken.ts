import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { INTERNAL_SERVER_ERROR } from '../controllers/protocols';

function signToken(
	_: Request,
	res: Response,
	next: NextFunction
): Response | any {
	const { id } = res.locals.user;

	try {
		const token: string = jwt.sign({ id }, process.env.JWT_SECRET_KEY!, {
			expiresIn: 60 * 60 * 24,
		});

		res.locals.token = token;

		next();
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json({ message: (err as Error).message });
	}
}

export default signToken;
