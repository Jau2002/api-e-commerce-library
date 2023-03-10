//    _____________________
//   /                 `   \
//   |  .-----------.  |   |-----.
//   |  |           |  |   |-=---|
//   |  | Apple //c |  |   |-----|
//   |  |           |  |   |-----|
//   |  |           |  |   |-----|
//   |  `-----------'  |   |-----'/\
//    \________________/___'     /  \
//       /                      / / /
//      / //               //  / / /
//     /                      / / /
//    / _/_/_/_/_/_/_/_/_/_/ /   /
//   / _/_/_/_/_/_/_/_/_/_/ /   /
//  / _/_/_/_______/_/_/_/ / __/
// /______________________/ /
// \______________________\/

import * as dotenv from 'dotenv';
import app from './middlewares/app';

dotenv.config({ path: '.env' });

const PORT: number = process.env.PORT != null ? parseInt(process.env.PORT) : 0;

app.listen(PORT, 'localhost', function (): void {
	console.log(`http://localhost:${this.address().port}`);
});
