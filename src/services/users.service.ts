import type { User } from '@prisma/client';
import type { CrateUserDto, UpdateUserDto } from '../dto/user-dto';
import prisma from '../middlewares/client';

export async function getUsers(): Promise<User[]> {
	const userSearchAll: User[] = await prisma.user.findMany({
		orderBy: { name: 'asc' },
	});

	return userSearchAll;
}

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
	{ email, name, password, address, photo }: UpdateUserDto
): Promise<User> {
	const userUpdate: User = await prisma.user.update({
		where: { id },
		data: {
			email,
			name,
			password,
			address,
			photo,
		},
	});

	return userUpdate;
}
