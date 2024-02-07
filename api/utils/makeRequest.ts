import mongoClient from '@/api/utils/mongoClient';
import { MongoClient } from 'mongodb';
import { handleResponse } from '@/api/utils/handleResponse';
import { httpStatusCodes } from '../constants/httpStatusCodes';

import { get } from '@/api/methods/get';
// import { post } from './post';
// import { patch } from './patch';
// import { del } from './delete';

import type { ApiRequestParams } from '@/api/api';

export const makeRequest = async ({ req, res, collectionName, query, sortBy, sortDirection }: ApiRequestParams) => {
	const METHOD = req?.method?.toLowerCase();
	const client: MongoClient = mongoClient;
	const db = client.db(process.env.DB_NAME);
	let response = { error: { status: httpStatusCodes.BAD_REQUEST, message: 'Invalid request' } };

	switch (METHOD) {
		case 'get':
			response = await get({ db, collectionName, query, sortBy, sortDirection });
			break;
		// case 'post':
		// 	await post({ req, res, collectionName, db });
		// 	break;
		// case 'patch':
		// 	await patch({ req, res, db, collectionName });
		// 	break;
		// case 'delete':
		// 	await del({ req, res, db, collectionName });
		// 	break;
	}
	handleResponse(response, res);
};
