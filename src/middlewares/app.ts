import cors from 'cors';
import express, {
	type Application,
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import morganBody from 'morgan-body';
import routerRoot from '../routes/root.routes';

const app: Application = express();

app.use(express.json({ strict: true }));

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((_: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

morganBody(app, {
	theme: 'inverted',
	logReqDateTime: false,
	logIP: false,
	logReqUserAgent: false,
	immediateReqLog: false,
});

app.use('/', routerRoot);

export default app;
