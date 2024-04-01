import express from 'express';
import { Request, Response } from 'express';

const app = express();

app.set('etag', false);
app.set('x-powered-by', false);

const database = new Database();

app.get('/weather/{city}', (req: Request, res: Response) => {
	const city = req.params.city;
	const responseType = req.header('Accept')?.indexOf('application/json') !== -1 ? SerializationFormat.Json : SerializationFormat.Plain;

	const report = database.getReport(city);

	if (report === undefined) {
		res.status(404).write();
		res.end();
		return;
	}

	res.status(200).write("Weather");
	res.end();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});