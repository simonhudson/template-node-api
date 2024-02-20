import { COLLECTION_NAME } from './constants';
import { createError } from '@/utils/createError';
import { getDuplicateEntries } from '@/utils/getDuplicateEntries';
import { handleResponse } from '@/utils/handleResponse';
import { httpStatusCodes } from '@/constants/httpStatusCodes';
import { makeRequest } from '@/utils/makeRequest';
import type { Request, Response } from 'express';

const getInvalidFields = (requestBody: Record<string, string>): string[] => {
	const invalidFields: string[] = [];
	['first_name', 'last_name', 'date_of_birth'].forEach((field): void => {
		if (!requestBody[field]) invalidFields.push(field);
	});
	return invalidFields;
};

export const post = async (req: Request, res: Response): Promise<void> => {
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

	// Make the request
	makeRequest({ req, res, collectionName: COLLECTION_NAME });
};
