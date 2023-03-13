interface Product {
	id: number;
	title: string;
	price: number;
	stock: number;
}

interface AddProductToCartDto {
	product: Product[];
	id: number;
}
