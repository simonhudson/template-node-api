import { createError } from '@/api/utils/createError';
import { Db } from 'mongodb';
import { ObjectId } from 'mongodb';

import type { ApiRequestParams } from '@/api/api';

interface ApiDeleteParams extends ApiRequestParams {
	db: Db;
}

export const del = async ({ req, collectionName, db }: ApiDeleteParams) => {
	const requestBody = req.body;
	const query = { _id: new ObjectId(requestBody._id) };
	try {
		const response = await db.collection(collectionName).deleteOne(query);
		return response;
	} catch (error: unknown) {
		return createError(error);
	}
};
