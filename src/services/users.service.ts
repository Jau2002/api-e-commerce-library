import type { User } from '@prisma/client';
import type { UpdateUserDto } from '../dto/users-dto';
import prisma from '../middlewares/client';
import type { UserRegister } from './services';

export async function getUsers(): Promise<User[]> {
	const userSearchAll: User[] = await prisma.user.findMany({
		orderBy: { name: 'asc' },
	});

	return userSearchAll;
}

export async function findForId(id: number): Promise<UserRegister> {
	const existUser: UserRegister = await prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			name: true,
			email: true,
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
