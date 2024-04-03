import { Router, Request, Response } from 'express';
import { serialize } from './variators/serializer';
import { AppError, ErrorType } from './models/errors';
import { SerializationFormat } from './models/serializationFormat';
import { parseAcceptHeader } from './parsers/accept';
import { Database } from './database';

const database = new Database();
const router = Router();

router.get('/weather/:city', (req: Request, res: Response) => {
    const city = req.params.city;
    const responseType = parseAcceptHeader(req.headers['accept'] || '');

    const ifModifiedSince = req.headers['if-modified-since'];
    const reportDate = database.getLastUpdate();

    // If the request has an If-Modified-Since header and the date is the same or newer than the last update,
    // we can return a 304 Not Modified response.
    if (ifModifiedSince !== undefined) {
        const ifModifiedSinceDate = new Date(ifModifiedSince);

        if (ifModifiedSinceDate >= reportDate) {
            res.status(304).end();
            return;
        }
    }

    // Then we check if the city exists in the database
    const report = database.getReport(city);
    if (report === undefined) {
        const err = new AppError(ErrorType.CityNotFound, 'City not found', { city });

        res.status(404);

        sendErrorResponse(res, responseType, err);
        return;
    }

    // Finally we check if the report data is up to date
    const reportSum = report.getChecksum();
    const providedSum = req.headers['if-none-match'];

    if (providedSum !== undefined && providedSum === reportSum) {
        res.status(304).end();
        return;
    }

    res.status(200)
        .appendHeader('Last-Modified', reportDate.toUTCString())
        .appendHeader('ETag', reportSum);
    sendResponse(res, responseType, report);
});

function sendErrorResponse(res: Response, format: SerializationFormat, error: AppError) {
    if (format === SerializationFormat.Json) {
        format = SerializationFormat.ProblemJson;
    }

    sendResponse(res, format, error);
}

function sendResponse(res: Response, format: SerializationFormat, data: any) {
    res
        .appendHeader('Content-Type', format)
        .send(serialize(data, format));
}

export default router;
