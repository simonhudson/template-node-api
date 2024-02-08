import { DeleteResult, InsertOneResult, UpdateResult, WithId } from 'mongodb';
import { httpStatusCodes } from '@/api/constants/httpStatusCodes';
import type { Request, Response } from 'express';
import type { ApiErrorResponse } from '@/api/api';

type ResponsePayload = {
	status: number;
	data?: any;
	metadata: {
		endpoint: string;
		method: string;
		count?: number;
	};
	error?: any;
};

export const handleResponse = (
	req: Request,
	res: Response,
	response:
		| WithId<any>[]
		| InsertOneResult<Document>
		| UpdateResult<Document>
		| DeleteResult
		| ApiErrorResponse
		| unknown
) => {
	const responsePayload: ResponsePayload = {
		status: httpStatusCodes.OK,
		metadata: {
			endpoint: req.originalUrl,
			method: req.method,
		},
		data: [],
	};

	if (response && typeof response === 'object' && 'error' in response && response.error) {
		responsePayload.error = response.error;
	} else {
		responsePayload.data = response;
	}

	if (Array.isArray(response) && response.length > 0) responsePayload.metadata.count = response.length;
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(responsePayload);
};
