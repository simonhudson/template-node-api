import { createError } from '@/utils/createError';
import { handleResponse } from '@/utils/handleResponse';
import { httpStatusCodes } from '@/constants/httpStatusCodes';
import { preparePayloadForInsertion } from '@/utils/preparePayloadForInsertion';
import type { ApiErrorResponse, ApiRequestParams } from '@/types/api';
import type { Db, InsertOneResult, OptionalId } from 'mongodb';
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

	requestBody.createdAt = new Date();
	requestBody.updatedAt = requestBody.createdAt;

	try {
		const response = await db
			.collection(collectionName)
			.insertOne(preparePayloadForInsertion(requestBody) as OptionalId<Document>);
		return response;
	} catch (error: unknown) {
		return createError({ data: error });
	}
};
