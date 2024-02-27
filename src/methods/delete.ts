import { createError } from '@/utils/createError';
import { ObjectId } from 'mongodb';
import type { ApiErrorResponse, ApiRequestParams } from '@/types/api';
import type { Db, DeleteResult } from 'mongodb';

export interface ApiDeleteParams extends ApiRequestParams {
	db: Db;
}

export const del = async ({ req, collectionName, db }: ApiDeleteParams): Promise<DeleteResult | ApiErrorResponse> => {
	const requestBody = req.body;
	const query = { _id: ObjectId.createFromHexString(requestBody._id.toString()) };
	try {
		const response = await db.collection(collectionName).deleteOne(query);
		return response;
	} catch (error: unknown) {
		return createError({ data: error });
	}
};
