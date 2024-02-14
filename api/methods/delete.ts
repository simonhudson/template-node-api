import { createError } from '@/api/utils/createError';
import { Db } from 'mongodb';
import { ObjectId } from 'mongodb';
import type { ApiErrorResponse, ApiRequestParams } from '@/api/types/api';
import type { DeleteResult } from 'mongodb';

export interface ApiDeleteParams extends ApiRequestParams {
	db: Db;
}

export const del = async ({ req, collectionName, db }: ApiDeleteParams): Promise<DeleteResult | ApiErrorResponse> => {
	const requestBody = req.body;
	const query = { _id: new ObjectId(requestBody._id) };
	try {
		const response = await db.collection(collectionName).deleteOne(query);
		return response;
	} catch (error: unknown) {
		return createError({ data: error });
	}
};
