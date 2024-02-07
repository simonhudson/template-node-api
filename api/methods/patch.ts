import { ObjectId } from 'mongodb';
import { sanitizePayload } from '@/api/utils/sanitizePayload';
import { sortObjectByKey } from '@/api/utils/sortObjectByKey';
import { createError } from '@/api/utils/createError';
import { Db } from 'mongodb';
import type { ApiRequestParams } from '@/api/api';

interface PatchParams extends ApiRequestParams {
	db: Db;
}

export const patch = async ({ req, collectionName, db }: PatchParams) => {
	const requestBody = req.body;
	const query = { _id: new ObjectId(requestBody._id) };

	delete requestBody._id;

	requestBody.updated_at = new Date();

	let finalPayload = sortObjectByKey(requestBody);
	finalPayload = sanitizePayload(finalPayload);

	const payload = {
		$set: finalPayload,
	};

	try {
		const response = await db.collection(collectionName).updateOne(query, payload);
		return response;
	} catch (error: unknown) {
		return createError({ error });
	}
};
