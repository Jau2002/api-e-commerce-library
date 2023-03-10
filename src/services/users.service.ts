import type { User } from '@prisma/client';
import prisma from '../middlewares/client';

export async function getUsers(): Promise<User[]> {
	const userSearchAll: User[] = await prisma.user.findMany({
		orderBy: { name: 'asc' },
	});
	return userSearchAll;
}
