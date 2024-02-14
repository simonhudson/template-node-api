import { createError } from '@/api/utils/createError';
import { del } from '@/api/methods/delete';
import { DELETE, GET, PATCH, POST, validMethods } from '@/api/constants/methods';
import { get } from '@/api/methods/get';
import { handleResponse } from '@/api/utils/handleResponse';
import { httpStatusCodes } from '@/api/constants/httpStatusCodes';
import { MongoClient } from 'mongodb';
import { patch } from '@/api/methods/patch';
import { post } from '@/api/methods/post';
import mongoClient from '@/api/utils/mongoClient';
import type { ApiRequestParams } from '@/api/types/api';
import type { Response } from 'express';

interface MakeRequestParams extends ApiRequestParams {
	res: Response;
}

export const makeRequest = async ({
	req,
	res,
	collectionName,
	query,
	sortBy,
	sortDirection,
}: MakeRequestParams): Promise<void> => {
	const METHOD = req?.method?.toUpperCase();

	if (!validMethods.includes(METHOD)) {
		res.status(httpStatusCodes.METHOD_NOT_ALLOWED);
		const errorResponse = createError({
			message: `Invalid method (${METHOD}). Valid methods are ${validMethods.join(', ')}`,
		});
		handleResponse(req, res, errorResponse);
	} else {
		const client: MongoClient = mongoClient;
		const db = client.db(process.env.DB_NAME);

		let response;

		switch (METHOD) {
			case GET:
				response = await get({ req, res, collectionName, db, query, sortBy, sortDirection });
				break;
			case POST:
				response = await post({ req, res, collectionName, db });
				break;
			case PATCH:
				response = await patch({ req, collectionName, db });
				break;
			case DELETE:
				response = await del({ req, collectionName, db });
				break;
		}
		handleResponse(req, res, response);
	}
};
