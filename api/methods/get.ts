import { createError } from '@/api/utils/createError';
import { Db } from 'mongodb';
import type { Response } from 'express';

import type { ApiRequestParams } from '@/api/api';
interface ApiGetParams extends ApiRequestParams {
	db: Db;
	res: Response;
}

export const get = async ({ collectionName, db, query, sortBy, sortDirection }: ApiGetParams) => {
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
