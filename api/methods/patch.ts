import { createError } from '@/api/utils/createError';
import { Db } from 'mongodb';
import { ObjectId } from 'mongodb';
import { preparePayloadForInsertion } from '@/api/utils/preparePayloadForInsertion';
import type { ApiErrorResponse, ApiRequestParams } from '@/api/api';
import type { UpdateResult } from 'mongodb';
export interface ApiPatchParams extends ApiRequestParams {
	db: Db;
}

export const patch = async ({
	req,
	collectionName,
	db,
}: ApiPatchParams): Promise<UpdateResult<Document> | ApiErrorResponse> => {
	const requestBody = req.body;
	const query = { _id: new ObjectId(requestBody._id) };

	delete requestBody._id;

	requestBody.updated_at = new Date();

	const payload = {
		$set: preparePayloadForInsertion(requestBody),
	};

	try {
		const response = await db.collection(collectionName).updateOne(query, payload);
		return response;
	} catch (error: unknown) {
		return createError({ data: error });
	}
};
