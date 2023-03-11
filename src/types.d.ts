export interface JwtPayload {
	id: string;
}

interface Email {
	email: string;
}

interface UserAuth {
	email: string;
	password: string;
}
