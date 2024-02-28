import { createError } from '@/utils/createError';
import { ObjectId } from 'mongodb';
import { preparePayloadForInsertion } from '@/utils/preparePayloadForInsertion';
import type { ApiErrorResponse, ApiRequestParams } from '@/types/api';
import type { Db, UpdateResult } from 'mongodb';
export interface ApiPatchParams extends ApiRequestParams {
	db: Db;
}

export const patch = async ({
	req,
	collectionName,
	db,
}: ApiPatchParams): Promise<UpdateResult<Document> | ApiErrorResponse> => {
	const requestBody = req.body;
	const query = { _id: ObjectId.createFromHexString(requestBody._id.toString()) };

	delete requestBody._id;

	requestBody.updatedAt = new Date();

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
