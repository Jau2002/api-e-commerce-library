import type { Product } from '@prisma/client';
import { type CrateProductDto } from '../dto/products-dto';
import prisma from '../middlewares/client';

export async function getStackProducts(): Promise<Product[]> {
	const userSearchAll: Product[] = await prisma.product.findMany({
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

export async function postProduct({
	title,
	author,
	price,
	editorial,
	stock,
}: CrateProductDto): Promise<Product> {
	const createProduct: Product = await prisma.product.create({
		data: {
			title,
			author,
			price,
			editorial,
			stock,
		},
	});

	return createProduct;
}
