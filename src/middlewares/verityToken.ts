import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '../controllers/protocols';
import type { AccessToken, JwtPayload } from '../types';

function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction
): Response | any {
	const accessToken: AccessToken = req.headers['x-access-token'];

	try {
		if (!accessToken) {
			return res
				.status(UNAUTHORIZED)
				.json({ auth: false, message: 'No token provided' });
		}

		const token: string | false =
			typeof accessToken === 'string' && accessToken;

		const { id } = jwt.verify(
			token.toString(),
			process.env.JWT_SECRET_KEY
		) as JwtPayload;

		res.locals.user = id;

		next();
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json({ message: (err as Error).message });
	}
}

export default verifyToken;
