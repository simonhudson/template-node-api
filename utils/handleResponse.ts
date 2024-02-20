import type { ApiErrorResponse } from '@/types/api';
import type { DeleteResult, InsertOneResult, UpdateResult, WithId } from 'mongodb';
import type { Request, Response } from 'express';

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

export const handleResponse = async (
	req: Request,
	res: Response,
	response:
		| WithId<any>[]
		| InsertOneResult<Document>
		| UpdateResult<Document>
		| DeleteResult
		| ApiErrorResponse
		| unknown
): Promise<any> => {
	const responsePayload: ResponsePayload = {
		status: res.statusCode,
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

	if (Array.isArray(response)) responsePayload.metadata.count = response.length;
	res.status(res.statusCode);
	res.setHeader('Access-Control-Allow-Origin', '*');
	return responsePayload;
};
