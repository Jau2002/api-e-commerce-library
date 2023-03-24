interface User {
	id: string;
	email: string;
	name: string;
	password: string;
	address: string;
	photo: string;
	createdAt: Date;
	updatedAt: Date;
}

export declare global {
	namespace Express {
		interface Response {
			locals: {
				user?: User;
			};
		}
	}
	namespace NodeJS {
		interface ProcessEnv {
			PORT?: number;
			DB?: string;
			DB_USER: string;
			DB_PASSWORD: string;
			DB_HOST: string;
			DB_PORT: number;
			DB_NAME: string;
			JWT_SECRET_KEY: string;
			WALKWAY_API_CLIENT_ID: string;
			WALKWAY_APP_SECRET: string;
			BASE_URL: string;
		}
	}
}

interface Email {
	email: string;
}

interface UserAuth {
	email: string;
	password: string;
}
