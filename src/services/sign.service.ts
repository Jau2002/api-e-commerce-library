import type { User } from '@prisma/client';
import md5 from 'md5';
import type { CrateUserDto } from '../dto/users-dto';
import prisma from '../middlewares/client';
import type { Email, UserAuth } from '../types';

export async function findForEmail({ email }: Email): Promise<User | null> {
	const existUser: User | null = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	return existUser;
}

export async function postUser({
	email,
	name,
	password,
}: CrateUserDto): Promise<User> {
	const userCreate: User = await prisma.user.create({
		data: {
			email,
			name,
			password: md5(password),
		},
	});

	return userCreate;
}

export async function findUserAuth({
	email,
	password,
}: UserAuth): Promise<User | null> {
	const searchUser: User | null = await prisma.user.findFirst({
		where: {
			email,
			password: md5(password),
		},
	});
	return searchUser;
}
