import { COLLECTION_NAME } from '@/users/constants';
import { makeRequest } from '@/utils/makeRequest';
import { UsersController } from '@/users/controllers';
import type { Request, Response } from 'express';

export const del = async (req: Request, res: Response): Promise<void> => {
	const data = await makeRequest({ req, res, collectionName: COLLECTION_NAME });
	UsersController.del(res, data);
};
