import type { User } from '@prisma/client';
import type { UpdateUserDto } from '../dto/users-dto';
import prisma from '../middlewares/client';

export async function getUsers(): Promise<User[]> {
	const userSearchAll: User[] = await prisma.user.findMany({
		orderBy: { name: 'asc' },
	});

	return userSearchAll;
}

export async function findForId(id: number): Promise<User | null> {
	const existUser: User | null = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	return existUser;
}

export async function updateUser(
	id: number,
	{ address, photo }: UpdateUserDto
): Promise<User> {
	const userUpdate: User = await prisma.user.update({
		where: { id },
		data: {
			address,
			photo,
		},
	});

	return userUpdate;
}
