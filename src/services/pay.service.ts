import axios, { type AxiosResponse } from 'axios';
import type { GetProductIdToCart, Product } from './services';

const { WALKWAY_APP_SECRET, WALKWAY_API_CLIENT_ID, BASE_URL, PORT } =
	process.env;

async function generateAccessToken(): Promise<string> {
	const params = new URLSearchParams();

	params.append('grant_type', 'client_credentials');

	const { data }: AxiosResponse = await axios.post(
		`${BASE_URL}/v1/oauth2/token`,
		params,
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			auth: {
				username: WALKWAY_API_CLIENT_ID,
				password: WALKWAY_APP_SECRET,
			},
		}
	);

	return data.access_token;
}

export function generateOrder(product?: GetProductIdToCart | null): object {
	const order = {
		purchase_units: [
			product?.product.map(
				({ price, title, author, editorial }: Product): object => ({
					amount: {
						currency_code: 'USD',
						value: price,
					},
					description: `${title} - ${author} - ${editorial}`,
				})
			),
		],
		application_context: {
			brand_name: 'company',
			user_action: 'PAY_NOW',
			landing_page: 'LOGIN',
			return_url: `http://localhost:${PORT}/pay/capture`,
		},
	};

	return order;
}

export async function createOrder(): Promise<AxiosResponse> {
	const token: string = await generateAccessToken();

	const order: object = generateOrder();

	const { data }: AxiosResponse = await axios.post(
		`${BASE_URL}/v2/checkout/orders`,
		order,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return data;
}
