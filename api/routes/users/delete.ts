import { COLLECTION_NAME } from './constants';
import { makeRequest } from '@/api/utils/makeRequest';
import type { Request, Response } from 'express';

export const del = async (req: Request, res: Response): Promise<void> => {
	makeRequest({ req, res, collectionName: COLLECTION_NAME });
};
