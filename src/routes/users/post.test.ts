import { createError } from '@/utils/createError';
import { getDuplicateEntries } from '@/utils/getDuplicateEntries';
import { handleResponse } from '@/utils/handleResponse';
import { makeRequest } from '@/utils/makeRequest';
import { post } from './post';
import type { Request, Response } from 'express';

jest.mock('@/utils/createError');
jest.mock('@/utils/getDuplicateEntries');
jest.mock('@/utils/handleResponse');
jest.mock('@/utils/makeRequest');

describe('post', () => {
	let mockReq = {} as Request;
	let mockRes = {} as Response;

	beforeEach(() => {
		mockReq = {
			params: {},
			body: {
				first_name: 'John',
				last_name: 'Doe',
				date_of_birth: '1990-01-01',
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
		delete mockReq.body.first_name;
		delete mockReq.body.date_of_birth;

		// When
		await post(mockReq, mockRes);

		// Then
		expect(mockRes.status).toHaveBeenCalledTimes(1);
		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.json).toHaveBeenCalledTimes(1);
		expect(createError).toHaveBeenCalledTimes(1);
		expect(createError).toHaveBeenCalledWith({
			message: `Invalid field(s)`,
			data: ['first_name', 'date_of_birth'],
		});
		expect(handleResponse).toHaveBeenCalledTimes(1);
		expect(handleResponse).toHaveBeenCalledWith(mockReq, mockRes, 'create-error-response');
		expect(makeRequest).not.toHaveBeenCalled();
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
	});
});
