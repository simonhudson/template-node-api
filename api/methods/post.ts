import { createError } from '@/api/utils/createError';
import { handleResponse } from '@/api/utils/handleResponse';
import { httpStatusCodes } from '@/api/constants/httpStatusCodes';
import { OptionalId } from 'mongodb';
import { preparePayloadForInsertion } from '@/api/utils/preparePayloadForInsertion';
import type { ApiErrorResponse, ApiRequestParams } from '@/api/types/api';
import type { Db, InsertOneResult } from 'mongodb';
import type { Response } from 'express';

export interface ApiPostParams extends ApiRequestParams {
	db: Db;
	res: Response;
}

export const post = async ({
	req,
	res,
	collectionName,
	db,
}: ApiPostParams): Promise<InsertOneResult<Document> | ApiErrorResponse | void> => {
	const requestBody = req.body;

	if (!Object.keys(requestBody).length) {
		res.status(httpStatusCodes.BAD_REQUEST);
		return handleResponse(req, res, createError({ message: 'No request body provided' }));
	}

	requestBody.created_at = new Date();
	requestBody.updated_at = requestBody.created_at;

	try {
		const response = await db
			.collection(collectionName)
			.insertOne(preparePayloadForInsertion(requestBody) as OptionalId<Document>);
		return response;
	} catch (error: unknown) {
		return createError({ data: error });
	}
};
