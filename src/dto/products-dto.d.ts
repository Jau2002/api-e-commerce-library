export interface CrateProductDto {
	id: number;
	title: string;
	author: string;
	price: number;
	editorial: string;
	stock: number;
	updatedAt: Date;
}

export interface UpdateProductDto {
	id: number;
	title: string;
	author: string;
	price: number;
	editorial: string;
	stock: number;
	updatedAt: Date;
}
