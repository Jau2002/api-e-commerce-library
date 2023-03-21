import type { Cart } from '@prisma/client';

interface SignUser {
	id: number;
	name: string;
	email: string;
}

export type UserRegister = SignUser | null;

interface UpdateUser {
	id: number;
	name: string;
	email: string;
	address: string | null;
	Cart: Cart | null;
	photo: string | null;
}

interface GetProductIdToCart {
	product: Product[];
}

interface Product {
	id: number;
	title: string;
	price: number;
	stock: number;
	author: string;
	editorial: string;
}
