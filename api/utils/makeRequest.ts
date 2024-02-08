import { del } from '@/api/methods/delete';
import { get } from '@/api/methods/get';
import { handleResponse } from '@/api/utils/handleResponse';
import { MongoClient } from 'mongodb';
import { patch } from '@/api/methods/patch';
import { post } from '@/api/methods/post';
import mongoClient from '@/api/utils/mongoClient';
import type { ApiRequestParams } from '@/api/api';
import type { Response } from 'express';

interface MakeRequestParams extends ApiRequestParams {
	res: Response;
}

export const makeRequest = async ({ req, res, collectionName, query, sortBy, sortDirection }: MakeRequestParams) => {
	const METHOD = req?.method?.toLowerCase();
	const client: MongoClient = mongoClient;
	const db = client.db(process.env.DB_NAME);

	let response;

	switch (METHOD) {
		case 'get':
			response = await get({ req, res, db, collectionName, query, sortBy, sortDirection });
			break;
		case 'post':
			response = await post({ req, res, collectionName, db });
			break;
		case 'patch':
			response = await patch({ req, db, collectionName });
			break;
		case 'delete':
			response = await del({ req, db, collectionName });
			break;
	}
	handleResponse(req, res, response);
};
