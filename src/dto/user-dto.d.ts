export interface CrateUserDto {
	id: string;
	email: string;
	name: string;
	password: string;
	address?: string;
	photo?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UpdateUserDto {
	id: string;
	email: string;
	name: string;
	password: string;
	address: string;
	photo: string;
	createdAt: Date;
	updatedAt: Date;
}
