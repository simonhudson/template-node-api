import { COLLECTION_NAME } from './constants';
import { makeRequest } from '@/api/utils/makeRequest';
import type { Request, Response } from 'express';

export const get = async (req: Request, res: Response) => {
	makeRequest({ req, res, collectionName: COLLECTION_NAME, sortBy: 'last_name', sortDirection: 'asc' });
};
