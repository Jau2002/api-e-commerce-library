import type { Product } from '@prisma/client';
import type { CrateProductDto, UpdateProductDto } from '../dto/products-dto';
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

export async function filtreForId(id: number): Promise<Product | null> {
	const existProduct: Product | null = await prisma.product.findUnique({
		where: {
			id,
		},
	});
	return existProduct;
}

export async function updateProduct(
	id: number,
	{ title, stock, price, author, editorial }: UpdateProductDto
): Promise<Product> {
	const productUpdate: Product = await prisma.product.update({
		where: { id },
		data: {
			title,
			stock,
			price,
			author,
			editorial,
		},
	});

	return productUpdate;
}
