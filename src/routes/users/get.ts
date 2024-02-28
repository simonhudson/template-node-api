import { COLLECTION_NAME } from './constants';
import { makeRequest } from '@/utils/makeRequest';
import { slugify } from '@/utils/slugify';
import dayjs from 'dayjs';
import type { Request, Response } from 'express';
import type { User } from './types';

const transform = (data: any, departments: any): User[] => {
	data?.data.forEach((item: any) => {
		item.department = departments.find((department: any) => department._id.toString() === item.departmentId).name;
		item.age = dayjs().diff(dayjs(item.dateOfBirth), 'year');
		item.slug = slugify(`${item.firstName} ${item.lastName}`);
		delete item.departmentId;
	});
	return data;
};

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

	const departmentsData = await makeRequest({ req, res, collectionName: 'departments' });

	res.json(
		transform(
			await makeRequest({
				req,
				res,
				collectionName: COLLECTION_NAME,
				sortBy: 'lastName',
				sortDirection: 'asc',
				query,
			}),
			departmentsData.data
		)
	);
};
