import { slugify } from '@/utils/slugify';
import dayjs from 'dayjs';
import type { ApiSuccessResponse, ApiErrorResponse } from '@/types/api';
import type { Response } from 'express';
import type { User } from '@/users/types';

const transform = (data: any): User[] => {
	data?.data.forEach((item: any) => {
		item.age = dayjs().diff(dayjs(item.dateOfBirth), 'year');
		item.slug = slugify(`${item.firstName} ${item.lastName}`);
	});
	return data;
};

export const get = (res: Response, data: ApiSuccessResponse | ApiErrorResponse): void => {
	res.json(transform(data));
};
