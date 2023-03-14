import type { User } from '@prisma/client';
import type { UpdateUserDto } from '../dto/users-dto';
import prisma from '../middlewares/client';
import type { UpdateUser, UserRegister } from './services';

export async function getUsers(): Promise<User[]> {
	const userSearchAll: User[] = await prisma.user.findMany({
		orderBy: { name: 'asc' },
		select: {
			id: true,
			email: true,
			name: true,
			address: true,
			photo: true,
			password: true,
			Cart: true,
		},
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
			address: true,
			Cart: true,
			photo: true,
		},
	});

	return existUser;
}

export async function updateUser(
	id: number,
	{ address, photo }: UpdateUserDto
): Promise<UpdateUser> {
	const userUpdate: UpdateUser = await prisma.user.update({
		where: { id },
		data: {
			address,
			photo,
		},
		select: {
			id: true,
			name: true,
			email: true,
			address: true,
			photo: true,
			Cart: true,
		},
	});

	return userUpdate;
}
