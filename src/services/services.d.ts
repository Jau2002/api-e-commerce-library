interface SignUser {
	id: number;
	name: string;
	email: string;
}

export type UserRegister = SignUser | null;
