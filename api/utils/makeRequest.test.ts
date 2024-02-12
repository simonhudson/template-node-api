import { makeRequest } from './makeRequest';
import { handleResponse } from '@/api/utils/handleResponse';
import { createError } from '@/api/utils/createError';
import mongoClient from '@/api/utils/mongoClient';
import type { Request, Response } from 'express';

jest.mock('@/api/utils/handleResponse');
jest.mock('@/api/utils/createError');
jest.mock('@/api/utils/mongoClient');

describe('makeRequest', () => {
	let mockReq = {} as Request;
	let mockRes = {} as Response;
	const collectionName = 'test-collection';

	beforeEach(() => {
		mockReq = {} as unknown as Request;
		mockRes = {
			status: jest.fn() as jest.Mock,
		} as unknown as Response;
	});

	afterAll(() => {});

	it('should handle invalid method', async () => {
		// Given
		mockReq.method = 'foo';

		// When
		await makeRequest({ req: mockReq, res: mockRes, collectionName });

		// Then
		expect(mockRes.status).toHaveBeenCalledTimes(1);
		expect(mockRes.status).toHaveBeenCalledWith(405);
		expect(createError).toHaveBeenCalledTimes(1);
		expect(createError).toHaveBeenCalledWith({
			message: `Invalid method (FOO). Valid methods are CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE`,
		});
		expect(handleResponse).toHaveBeenCalledTimes(1);
	});
});
