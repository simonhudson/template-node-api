import { COLLECTION_NAME } from './constants';
import { makeRequest } from '@/utils/makeRequest';
import dayjs from 'dayjs';
import type { Request, Response } from 'express';

const transform = async (data: any) => {
	data?.data.forEach((item: any) => {
		item.age = dayjs().diff(dayjs(item.date_of_birth), 'year');
	});
	return data;
};

export const get = async (req: Request, res: Response): Promise<void> => {
	const userSlug = req.params.slug;
	let query = {};
	if (userSlug) {
		const nameSplit = userSlug.split('-');
		const firstName = nameSplit[0];
		const lastName = nameSplit[1];
		if (firstName && lastName) query = { first_name: firstName, last_name: lastName };
	}
	res.json(
		await transform(
			await makeRequest({
				req,
				res,
				collectionName: COLLECTION_NAME,
				sortBy: 'last_name',
				sortDirection: 'asc',
				query,
			})
		)
	);
};
