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

import app from './middlewares/app';

const PORT: number = process.env.PORT != null ? parseInt(process.env.PORT) : 0;

app.listen(PORT, 'localhost', function () {
	console.log(`http://localhost:${this.address().port}`);
});
