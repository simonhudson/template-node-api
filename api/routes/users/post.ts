import { COLLECTION_NAME } from './constants';
import { createError } from '@/api/utils/createError';
import { getDuplicateEntries } from '@/api/utils/getDuplicateEntries';
import { handleResponse } from '@/api/utils/handleResponse';
import { httpStatusCodes } from '@/api/constants/httpStatusCodes';
import { makeRequest } from '@/api/utils/makeRequest';
import { slugify } from '@/api/utils/slugify';
import dayjs from 'dayjs';
import type { Request, Response } from 'express';

const getInvalidFields = (requestBody: Record<string, string>) => {
	const invalidFields: string[] = [];
	['first_name', 'last_name', 'date_of_birth'].forEach((field) => {
		if (!requestBody[field]) invalidFields.push(field);
	});
	return invalidFields;
};

export const post = async (req: Request, res: Response) => {
	const requestBody = req.body;

	// Check if required fields are present
	const invalidFields = getInvalidFields(requestBody);
	if (invalidFields.length) {
		res.status(httpStatusCodes.BAD_REQUEST);
		return handleResponse(req, res, createError({ message: `Invalid field(s)`, data: invalidFields }));
	}

	// Check if duplicate entries exist
	const duplicateEntries = await getDuplicateEntries(COLLECTION_NAME, requestBody);
	if (duplicateEntries.length) {
		res.status(httpStatusCodes.CONFLICT);
		return handleResponse(
			req,
			res,
			createError({
				message: `Duplicate entry found`,
				data: duplicateEntries,
			})
		);
	}

	// Add slug and age to the request body
	requestBody.slug = slugify(`${requestBody.first_name} ${requestBody.last_name}`);
	requestBody.age = dayjs().diff(dayjs(requestBody.date_of_birth), 'year');

	// Make the request
	makeRequest({ req, res, collectionName: COLLECTION_NAME });
};
