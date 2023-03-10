import type { User } from '@prisma/client';
import type { CrateUserDto } from '../dto/user-dto';
import prisma from '../middlewares/client';

export async function getUsers(): Promise<User[]> {
	const userSearchAll: User[] = await prisma.user.findMany({
		orderBy: { name: 'asc' },
	});

	return userSearchAll;
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
