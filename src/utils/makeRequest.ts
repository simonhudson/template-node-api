import { createError } from '@/utils/createError';
import { del } from '@/methods/delete';
import { DELETE, GET, PATCH, POST, validMethods } from '@/constants/methods';
import { get } from '@/methods/get';
import { handleResponse } from '@/utils/handleResponse';
import { httpStatusCodes } from '@/constants/httpStatusCodes';
import { MongoClient } from 'mongodb';
import { patch } from '@/methods/patch';
import { post } from '@/methods/post';
import mongoClient from '@/utils/mongoClient';
import type { ApiRequestParams } from '@/types/api';
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
}: MakeRequestParams): Promise<any> => {
	const METHOD = req?.method?.toUpperCase();

	if (!validMethods.includes(METHOD)) {
		res.status(httpStatusCodes.METHOD_NOT_ALLOWED);
		const errorResponse = createError({
			message: `Invalid method (${METHOD}). Valid methods are ${validMethods.join(', ')}`,
		});
		return handleResponse(req, res, errorResponse);
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
		return handleResponse(req, res, response);
	}
};
