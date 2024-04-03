import express from 'express';
import router from './handler';

const app = express();

app.set('etag', false);
app.set('x-powered-by', false);
app.set('cache-control', 'no-store');

app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Connection', 'close');

	next();
	console.log("[%s] %s %s - %d", new Date().toISOString(), req.method, req.url, res.statusCode);
});
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});