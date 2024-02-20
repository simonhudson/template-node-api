import { COLLECTION_NAME } from './constants';
import { makeRequest } from '@/utils/makeRequest';
import type { Request, Response } from 'express';

const transform = async (data: any) => {
	console.log('x----------------');
	console.log(data);
	console.log('/x----------------');
	return data;
	// // Add slug and age to the request body
	// requestBody.age = dayjs().diff(dayjs(requestBody.date_of_birth), 'year');
};

export const get = async (req: Request, res: Response): Promise<void> => {
	const userSlug = req.params.slug;
	const query = userSlug ? { slug: userSlug } : {};
	makeRequest({ req, res, collectionName: COLLECTION_NAME, sortBy: 'last_name', sortDirection: 'asc', query });
};
