export interface CrateUserDto {
	id: string;
	email: string;
	name: string;
	password: string;
	address?: string;
	photo?: string;
}

export interface UpdateUserDto {
	id: string;
	email: string;
	name: string;
	password: string;
	address: string;
	photo: string;
}
