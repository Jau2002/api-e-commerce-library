import type { AddProductToCartDto } from '../dto/cart-dto';
import prisma from '../middlewares/client';

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
