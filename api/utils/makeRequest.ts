import { handleResponse } from '@/api/utils/handleResponse';
import { MongoClient } from 'mongodb';
import { Request, Response } from 'express';
import mongoClient from '@/api/utils/mongoClient';

import { get } from '@/api/methods/get';
import { post } from '@/api/methods/post';
// import { patch } from './patch';
// import { del } from './delete';

import type { ApiRequestParams } from '@/api/api';

export const makeRequest = async ({ req, res, collectionName, query, sortBy, sortDirection }: ApiRequestParams) => {
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
		// case 'patch':
		// 	await patch({ req, res, db, collectionName });
		// 	break;
		// case 'delete':
		// 	await del({ req, res, db, collectionName });
		// 	break;
	}
	handleResponse(req, res, response);
};
