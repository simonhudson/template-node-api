import { createError } from '@/utils/createError';
import { getDuplicateEntries } from '@/utils/getDuplicateEntries';
import { handleResponse } from '@/utils/handleResponse';
import { makeRequest } from '@/utils/makeRequest';
import { post } from './post';
import { UsersController } from '@/users/controllers';
import { Validation } from '@/utils/validation';
import type { Request, Response } from 'express';

jest.mock('@/utils/createError');
jest.mock('@/utils/getDuplicateEntries');
jest.mock('@/utils/handleResponse');
jest.mock('@/utils/makeRequest');
jest.spyOn(UsersController, 'post');
jest.spyOn(Validation, 'missingRequiredFields');
jest.spyOn(Validation, 'dateOfBirthIsValid');

describe('post', () => {
	let mockReq = {} as Request;
	let mockRes = {} as Response;

	beforeEach(() => {
		mockReq = {
			params: {},
			body: {
				firstName: 'John',
				lastName: 'Doe',
				dateOfBirth: '1990-01-01',
			},
		} as unknown as Request;
		mockRes = {
			status: jest.fn(),
			json: jest.fn(),
		} as unknown as Response;
		(createError as jest.Mock).mockReturnValue('create-error-response');
		(getDuplicateEntries as jest.Mock).mockResolvedValue([]);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return 400 if required fields are missing', async () => {
		// Given
		delete mockReq.body.firstName;
		delete mockReq.body.dateOfBirth;

		// When
		await post(mockReq, mockRes);

		// Then
		expect(Validation.missingRequiredFields).toHaveBeenCalledTimes(1);
		expect(Validation.missingRequiredFields).toHaveBeenCalledWith(mockReq.body, [
			'firstName',
			'lastName',
			'dateOfBirth',
		]);
		expect(mockRes.status).toHaveBeenCalledTimes(1);
		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(createError).toHaveBeenCalledTimes(1);
		expect(createError).toHaveBeenCalledWith({
			message: `Missing required field(s)`,
			data: ['firstName', 'dateOfBirth'],
		});
		expect(handleResponse).toHaveBeenCalledTimes(1);
		expect(handleResponse).toHaveBeenCalledWith(mockReq, mockRes, 'create-error-response');
		expect(makeRequest).not.toHaveBeenCalled();
		expect(UsersController.post).not.toHaveBeenCalled;
	});

	it('should return 400 if Date of Birth is invalid', async () => {
		// Given
		mockReq.body.dateOfBirth = 'foo';

		// When
		await post(mockReq, mockRes);

		// Then
		expect(Validation.dateOfBirthIsValid).toHaveBeenCalledTimes(1);
		expect(Validation.dateOfBirthIsValid).toHaveBeenCalledWith('foo');
		expect(mockRes.status).toHaveBeenCalledTimes(1);
		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(createError).toHaveBeenCalledTimes(1);
		expect(createError).toHaveBeenCalledWith({
			message: `Invalid field(s)`,
			data: [{ field: 'dateOfBirth', attemptedValue: 'foo' }],
		});
		expect(handleResponse).toHaveBeenCalledTimes(1);
		expect(handleResponse).toHaveBeenCalledWith(mockReq, mockRes, 'create-error-response');
		expect(makeRequest).not.toHaveBeenCalled();
		expect(UsersController.post).not.toHaveBeenCalled;
	});

	it('should return 409 if duplicate entries are found', async () => {
		// Given
		(getDuplicateEntries as jest.Mock).mockResolvedValue(['duplicate-entry']);

		// When
		await post(mockReq, mockRes);

		// Then
		expect(mockRes.status).toHaveBeenCalledTimes(1);
		expect(mockRes.status).toHaveBeenCalledWith(409);
		expect(mockRes.json).toHaveBeenCalledTimes(1);
		expect(createError).toHaveBeenCalledTimes(1);
		expect(createError).toHaveBeenCalledWith({
			message: `Duplicate entry found`,
			data: ['duplicate-entry'],
		});
		expect(handleResponse).toHaveBeenCalledTimes(1);
		expect(handleResponse).toHaveBeenCalledWith(mockReq, mockRes, 'create-error-response');
		expect(makeRequest).not.toHaveBeenCalled();
		expect(UsersController.post).not.toHaveBeenCalled;
	});

	it('should make expected request', async () => {
		// When
		await post(mockReq, mockRes);

		// Then
		expect(mockRes.status).not.toHaveBeenCalled();
		expect(createError).not.toHaveBeenCalled();
		expect(mockRes.json).toHaveBeenCalledTimes(1);
		expect(makeRequest).toHaveBeenCalledTimes(1);
		expect(makeRequest).toHaveBeenCalledWith({
			req: {
				params: {},
				body: mockReq.body,
			},
			res: mockRes,
			collectionName: expect.any(String),
		});
		expect(UsersController.post).toHaveBeenCalledTimes(1);
	});
});
