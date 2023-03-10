import { PrismaClient } from '@prisma/client';

const { DB, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: `${DB}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
		},
	},
});

export default prisma;
