import { COLLECTION_NAME } from './constants';
import { createError } from '@/api/utils/createError';
import { handleResponse } from '@/api/utils/handleResponse';
import { makeRequest } from '@/api/utils/makeRequest';
import { slugify } from '@/api/utils/slugify';
import dayjs from 'dayjs';
import mongoClient from '@/api/utils/mongoClient';
import type { MongoClient } from 'mongodb';
import type { Request, Response } from 'express';

export const post = async (req: Request, res: Response) => {
	const requestBody = req.body;
	const client: MongoClient = mongoClient;
	const db = client.db(process.env.DB_NAME);

	const existingEntry = await db
		.collection(COLLECTION_NAME)
		.find({
			first_name: requestBody.first_name,
			last_name: requestBody.last_name,
			date_of_birth: requestBody.date_of_birth,
		})
		.toArray();

	if (existingEntry.length) {
		handleResponse(
			req,
			res,
			createError(
				`Duplicate entry found for ${requestBody.first_name} ${requestBody.last_name} with D.O.B ${requestBody.date_of_birth}`
			)
		);
	} else {
		requestBody.slug = slugify(`${requestBody.first_name} ${requestBody.last_name}`);
		requestBody.age = dayjs().diff(dayjs(requestBody.date_of_birth), 'year');
		makeRequest({ req, res, collectionName: COLLECTION_NAME });
	}
};
