import { COLLECTION_NAME } from '@/users/constants';
import { makeRequest } from '@/utils/makeRequest';
import type { Request, Response } from 'express';
import { UsersController } from '@/users/controllers';

export const patch = async (req: Request, res: Response): Promise<void> => {
	const data = await makeRequest({ req, res, collectionName: COLLECTION_NAME });
	UsersController.patch(res, data);
};
