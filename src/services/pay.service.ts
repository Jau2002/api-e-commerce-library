import axios, { type AxiosResponse } from 'axios';
import type { BasicAuth, GenerateOrder } from './services';

const { WALKWAY_APP_SECRET, WALKWAY_API_CLIENT_ID, BASE_URL, PORT } =
	process.env;

const basicAuth: () => BasicAuth = (): BasicAuth => ({
	username: WALKWAY_API_CLIENT_ID,
	password: WALKWAY_APP_SECRET,
});

async function generateAccessToken(): Promise<string> {
	const params = new URLSearchParams();

	params.append('grant_type', 'client_credentials');

	const auth: BasicAuth = basicAuth();

	const { data }: AxiosResponse = await axios.post(
		`${BASE_URL}/v1/oauth2/token`,
		params,
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			auth,
		}
	);

	return data.access_token;
}

function generateOrder(): GenerateOrder {
	const order = {
		intent: 'CAPTURE',
		purchase_units: [
			{
				amount: {
					currency_code: 'USD',
					value: 2.99,
				},
			},
		],
		application_context: {
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

export async function capturePayment(token: any): Promise<AxiosResponse> {
	const auth: BasicAuth = basicAuth();

	const { data }: AxiosResponse = await axios.post(
		`${BASE_URL}/v2/checkout/orders/${token}/capture`,
		{},
		{
			auth,
		}
	);

	return data;
}
