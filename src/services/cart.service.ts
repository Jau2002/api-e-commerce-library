import type { Cart } from '@prisma/client';
import type { AddProductToCartDto } from '../dto/cart-dto';
import prisma from '../middlewares/client';
import type { GetProductIdToCart } from './services';

export async function postProductCart(
	productId: number,
	userId: number
): Promise<AddProductToCartDto[]> {
	const pushProductInCart: AddProductToCartDto = await prisma.cart.create({
		data: {
			user: {
				connect: {
					id: userId,
				},
			},
			product: {
				connect: {
					id: productId,
				},
			},
		},
		select: {
			id: true,
			product: {
				select: {
					title: true,
					price: true,
					id: true,
					stock: true,
				},
			},
		},
	});

	return pushProductInCart;
}

export async function getProductCart(
	userId: number
): Promise<GetProductIdToCart | null> {
	const getProductIdToCart: GetProductIdToCart | null =
		await prisma.cart.findUnique({
			where: {
				userId,
			},
			select: {
				product: {
					select: {
						id: true,
						author: true,
						editorial: true,
						price: true,
						stock: true,
						title: true,
					},
				},
			},
		});

	return getProductIdToCart;
}

export async function deleteProduct(
	productId: number,
	userId: number
): Promise<Cart> {
	const deleteProductIdToCart: Cart = await prisma.cart.delete({
		where: {
			userId,
			id: productId,
		},
	});
	return deleteProductIdToCart;
}
