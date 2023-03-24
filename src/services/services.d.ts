import type { Cart } from '@prisma/client';

interface Product {
	id: number;
	title: string;
	price: number;
	stock: number;
	author: string;
	editorial: string;
}

interface ProductInCart {
	product: Product[];
	id?: number;
}

type GetProductInCart = ProductInCart | null;

interface User {
	name: string;
	id: number;
	email: string;
	address: string | null;
	photo: string | null;
	Cart: Cart | null;
}

interface SignUser {
	id: number;
	name: string;
	email: string;
}

type UserRegister = SignUser | null;

interface UserPut {
	address: string;
	photo: string;
}

interface UpdateUser {
	id: number;
	name: string;
	email: string;
	address: string | null;
	Cart: Cart | null;
	photo: string | null;
}

interface BasicAuth {
	username: string;
	password: string;
}

interface Amount {
	currency_code: string;
	value: number;
}

interface PurchaseUnits {
	amount: Amount;
}

interface ApplicationContext {
	user_action: string;
	landing_page: string;
	return_url: string;
}

interface GenerateOrder {
	intent: string;
	purchase_units: PurchaseUnits[];
	application_context: ApplicationContext;
}
