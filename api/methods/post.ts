import { createError } from '@/api/utils/createError';
import { Db } from 'mongodb';
import { OptionalId } from 'mongodb';
import { preparePayloadForInsertion } from '@/api/utils/preparePayloadForInsertion';
import type { ApiRequestParams } from '@/api/api';
import type { Response } from 'express';
import { handleResponse } from '@/api/utils/handleResponse';
import { httpStatusCodes } from '@/api/constants/httpStatusCodes';

export interface ApiPostParams extends ApiRequestParams {
	db: Db;
	res: Response;
}

export const post = async ({ req, res, collectionName, db }: ApiPostParams) => {
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
