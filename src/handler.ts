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

    const report = database.getReport(city);

    if (report === undefined) {
        const err = new AppError(ErrorType.CityNotFound, 'City not found', { city });
        sendErrorResponse(res, 404, responseType, err);
        return;
    }

    sendResponse(res, 200, responseType, report);
});

function sendErrorResponse(res: Response, status: number, format: SerializationFormat, error: AppError) {
    if (format === SerializationFormat.Json) {
        format = SerializationFormat.ProblemJson;
    }

    sendResponse(res, status, format, error);
}

function sendResponse(res: Response, status: number, format: SerializationFormat, data: any) {
    res
        .status(status)
        .appendHeader('Content-Type', format)
        .send(serialize(data, format));
}

export default router;
