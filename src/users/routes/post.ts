import { COLLECTION_NAME } from '@/users/constants';
import { createError } from '@/utils/createError';
import { Validation } from '@/utils/validation';
import { getDuplicateEntries } from '@/utils/getDuplicateEntries';
import { handleResponse } from '@/utils/handleResponse';
import { httpStatusCodes } from '@/constants/httpStatusCodes';
import { makeRequest } from '@/utils/makeRequest';
import { UsersController } from '@/users/controllers';
import type { Request, Response } from 'express';

export const post = async (req: Request, res: Response): Promise<any> => {
	const requestBody = req.body;

	// Check if required fields are present
	const missingRequiredFields = Validation.missingRequiredFields(requestBody, [
		'firstName',
		'lastName',
		'dateOfBirth',
	]);
	if (missingRequiredFields.length) {
		res.status(httpStatusCodes.BAD_REQUEST);
		return res.json(
			handleResponse(req, res, createError({ message: `Missing required field(s)`, data: missingRequiredFields }))
		);
	}

	// Check if date of birth is valid
	if (!Validation.dateOfBirthIsValid(requestBody.dateOfBirth)) {
		res.status(httpStatusCodes.BAD_REQUEST);
		return res.json(
			handleResponse(
				req,
				res,
				createError({
					message: `Invalid field(s)`,
					data: [{ field: 'dateOfBirth', attemptedValue: requestBody.dateOfBirth }],
				})
			)
		);
	}

	// Check if duplicate entries exist
	const duplicateEntries = await getDuplicateEntries(COLLECTION_NAME, requestBody);
	if (duplicateEntries.length) {
		res.status(httpStatusCodes.CONFLICT);
		return res.json(
			handleResponse(
				req,
				res,
				createError({
					message: `Duplicate entry found`,
					data: duplicateEntries,
				})
			)
		);
	}

	// Make the request
	const data = await makeRequest({ req, res, collectionName: COLLECTION_NAME });
	UsersController.post(res, data);
};
