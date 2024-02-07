import { Db } from 'mongodb';
import { createError } from '@/api/utils/createError';
import { handleResponse } from '@/api/utils/handleResponse';
import { OptionalId } from 'mongodb';
import { sanitizePayload } from '@/api/utils/sanitizePayload';
import { ApiRequestParams } from '@/api/api';
import { sortObjectByKey } from '@/api/utils/sortObjectByKey';

interface PostParams extends ApiRequestParams {
	db: Db;
}

export const post = async ({ req, res, collectionName, db }: PostParams) => {
	const requestBody = req.body;

	if (!Object.keys(requestBody).length) return createError('No request body provided');

	let finalPayload = sortObjectByKey(requestBody);
	finalPayload = sanitizePayload(finalPayload);

	try {
		const response = await db
			.collection(collectionName)
			.insertOne(sanitizePayload(finalPayload) as OptionalId<Document>);
		return response;
	} catch (error: unknown) {
		return createError({ error });
	}
};
