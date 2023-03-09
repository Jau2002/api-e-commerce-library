import cors from 'cors';
import express, { type Application } from 'express';
import morganBody from 'morgan-body';
import routerRoot from '../routes/root.routes';

const app: Application = express();

app.use(express.json({ strict: true }));

app.use(express.urlencoded({ extended: true }));

app.use(cors());

morganBody(app, {
	theme: 'inverted',
	logReqDateTime: false,
	logIP: false,
	logReqUserAgent: false,
	immediateReqLog: false,
});

app.use('/', routerRoot);

export default app;
