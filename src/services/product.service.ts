import prisma from '../middlewares/client';

export async function getStackProducts(): Promise<any> {
	const userSearchAll: any = await prisma.product.findMany({
		where: {
			stock: {
				gte: 1,
			},
		},
		orderBy: {
			title: 'asc',
		},
	});

	return userSearchAll;
}
