import { COLLECTION_NAME } from './constants';
import { makeRequest } from '@/api/utils/makeRequest';
import type { Request, Response } from 'express';

export const get = async (req: Request, res: Response): Promise<void> => {
	const userSlug = req.params.slug;
	const query = userSlug ? { slug: userSlug } : {};
	makeRequest({ req, res, collectionName: COLLECTION_NAME, sortBy: 'last_name', sortDirection: 'asc', query });
};
