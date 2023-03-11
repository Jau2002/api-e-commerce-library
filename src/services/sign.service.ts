import type { User } from '@prisma/client';
import type { CrateUserDto } from '../dto/user-dto';
import prisma from '../middlewares/client';

export async function findForEmail({
	email,
}: {
	email: string;
}): Promise<User | null> {
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
			password,
		},
	});

	return userCreate;
}
