import type { Response } from 'express';

type NextMiddle = Response<any, Record<string, any>> | undefined;

type AccessToken = string | string[] | undefined;

interface JwtPayload {
	id: string;
}
