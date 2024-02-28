import { COLLECTION_NAME } from './constants';
import { makeRequest } from '@/utils/makeRequest';
import type { Request, Response } from 'express';
import type { Department } from './types';

const transform = (data: any): Department[] => {
	return data;
};

export const get = async (req: Request, res: Response): Promise<void> => {
	let query = {};
	const { slug } = req.params;
	if (slug) {
		query = {
			name: { $regex: new RegExp(slug, 'i') },
		};
	}
	res.json(
		transform(
			await makeRequest({
				req,
				res,
				collectionName: COLLECTION_NAME,
				sortBy: 'name',
				sortDirection: 'asc',
				query,
			})
		)
	);
};
