import { createError } from '@/api/utils/createError';
import { Db } from 'mongodb';
import { OptionalId } from 'mongodb';
import { sanitizePayload } from '@/api/utils/sanitizePayload';
import { sortObjectByKey } from '@/api/utils/sortObjectByKey';
import type { ApiRequestParams } from '@/api/api';
import type { Response } from 'express';

interface PostParams extends ApiRequestParams {
	db: Db;
	res: Response;
}

export const post = async ({ req, collectionName, db }: PostParams) => {
	const requestBody = req.body;

	if (!Object.keys(requestBody).length) return createError('No request body provided');

	requestBody.created_at = new Date();
	requestBody.updated_at = requestBody.created_at;

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
