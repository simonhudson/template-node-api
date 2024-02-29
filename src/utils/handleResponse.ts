import type { ApiErrorResponse, ApiSuccessResponse } from '@/types/api';
import type { DeleteResult, InsertOneResult, UpdateResult, WithId } from 'mongodb';
import type { Request, Response } from 'express';

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
): ApiSuccessResponse => {
	const commitSha = process.env.COMMIT_SHA_SHORT ?? '';

	const responsePayload: ApiSuccessResponse = {
		status: res.statusCode,
		metadata: {
			endpoint: req.originalUrl,
			method: req.method,
			commitSha,
		},
		data: [],
	};

	if (response && typeof response === 'object' && 'error' in response && response.error) {
		responsePayload.error = response.error;
	} else {
		responsePayload.data = response as any[];
	}

	if (Array.isArray(response)) responsePayload.metadata.count = response.length;
	res.status(res.statusCode);
	res.setHeader('Access-Control-Allow-Origin', '*');
	return responsePayload;
};
