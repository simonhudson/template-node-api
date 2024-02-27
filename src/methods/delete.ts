import { createError } from '@/utils/createError';
import type { ApiErrorResponse, ApiRequestParams } from '@/types/api';
import type { Db, ObjectId, DeleteResult } from 'mongodb';

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
