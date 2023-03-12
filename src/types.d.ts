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
		}
	}
}

interface JwtPayload {
	id: string;
}

interface Email {
	email: string;
}

interface UserAuth {
	email: string;
	password: string;
}

type AccessToken = string | string[] | undefined;
