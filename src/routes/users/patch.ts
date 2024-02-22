import { COLLECTION_NAME } from './constants';
import { makeRequest } from '@/utils/makeRequest';
import type { Request, Response } from 'express';

export const patch = async (req: Request, res: Response): Promise<void> => {
	res.json(await makeRequest({ req, res, collectionName: COLLECTION_NAME }));
};
