import { createError } from '@/utils/createError';
import type { ApiErrorResponse, ApiRequestParams } from '@/types/api';
import type { Db } from 'mongodb';
import type { Response } from 'express';
import type { WithId } from 'mongodb';
export interface ApiGetParams extends ApiRequestParams {
	db: Db;
	res: Response;
}

export const get = async ({
	collectionName,
	db,
	query,
	sortBy,
	sortDirection,
}: ApiGetParams): Promise<WithId<any>[] | ApiErrorResponse> => {
	let queryObj = query || {};
	let sortQuery = {};
	if (sortBy) sortQuery = { [sortBy]: sortDirection === 'asc' ? 1 : -1 };

	try {
		const response = await db.collection(collectionName).find(queryObj).sort(sortQuery).toArray();
		return response;
	} catch (error: unknown) {
		return createError({ data: error });
	}
};
