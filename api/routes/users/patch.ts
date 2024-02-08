import { COLLECTION_NAME } from './constants';
import { makeRequest } from '@/api/utils/makeRequest';
import { slugify } from '@/api/utils/slugify';
import dayjs from 'dayjs';
import type { Request, Response } from 'express';

export const patch = async (req: Request, res: Response) => {
	const requestBody = req.body;
	requestBody.slug = slugify(`${requestBody.first_name} ${requestBody.last_name}`);
	requestBody.age = dayjs().diff(dayjs(requestBody.date_of_birth), 'year');
	makeRequest({ req, res, collectionName: COLLECTION_NAME });
};
