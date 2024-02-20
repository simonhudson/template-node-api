import { COLLECTION_NAME } from './constants';
import { makeRequest } from '@/utils/makeRequest';
import { obfuscateObject } from '@/utils/obfuscateObject';
import dayjs from 'dayjs';
import type { Request, Response } from 'express';

const transform = async (data: any) => {
	data?.data.forEach((item: any) => {
		item.age = dayjs().diff(dayjs(item.date_of_birth), 'year');
	});
	return obfuscateObject(data);
};

export const get = async (req: Request, res: Response): Promise<void> => {
	let query = {};
	const userSlug = req.params.slug;
	if (userSlug) {
		const nameSplit = userSlug.split('-');
		const firstName = nameSplit[0];
		const lastName = nameSplit[1];
		if (firstName && lastName) {
			query = {
				first_name: { $regex: new RegExp(firstName, 'i') },
				last_name: { $regex: new RegExp(lastName, 'i') },
			};
		}
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
