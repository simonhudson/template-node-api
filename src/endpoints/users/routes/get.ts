import { COLLECTION_NAME } from '@/endpoints/users/constants';
import { makeRequest } from '@/utils/makeRequest';
import type { Request, Response } from 'express';
import { UsersController } from '@/endpoints/users/controllers';

export const get = async (req: Request, res: Response): Promise<void> => {
	let query = {};
	const { slug } = req.params;
	if (slug) {
		const slugSplit = slug.split('-');
		const firstName = slugSplit[0];
		const lastName = slugSplit[1];
		if (firstName && lastName) {
			query = {
				firstName: { $regex: new RegExp(firstName, 'i') },
				lastName: { $regex: new RegExp(lastName, 'i') },
			};
		}
	}

	const data = await makeRequest({
		req,
		res,
		collectionName: COLLECTION_NAME,
		sortBy: 'lastName',
		sortDirection: 'asc',
		query,
	});

	UsersController.get(res, data);
};
