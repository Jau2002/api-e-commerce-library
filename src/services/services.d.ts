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

interface BasicAuth {
	username: string;
	password: string;
}

interface GenerateOrder {
	intent: string;
	purchase_units: Array<{
		amount: {
			currency_code: string;
			value: number;
		};
	}>;
	application_context: {
		user_action: string;
		landing_page: string;
		return_url: string;
	};
}
