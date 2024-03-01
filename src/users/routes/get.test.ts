import { get } from './get';
import { makeRequest } from '@/utils/makeRequest';
import { UsersController } from '@/users/controllers';
import type { Request, Response } from 'express';

jest.mock('@/utils/makeRequest');
jest.spyOn(UsersController, 'get');

describe('get', () => {
	let mockReq = {} as Request;
	let mockRes = {} as Response;

	beforeEach(() => {
		mockReq = {
			params: {},
		} as unknown as Request;
		mockRes = {
			json: jest.fn() as jest.Mock,
		} as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should make expected request without query', async () => {
		// When
		await get(mockReq, mockRes);

		// Then
		expect(makeRequest).toHaveBeenCalledTimes(1);
		expect(makeRequest).toHaveBeenCalledWith({
			req: mockReq,
			res: mockRes,
			collectionName: expect.any(String),
			sortBy: expect.any(String),
			sortDirection: expect.any(String),
			query: {},
		});
		expect(UsersController.get).toHaveBeenCalledTimes(1);
	});
	it('should make expected request with query', async () => {
		// Given
		mockReq.params = { slug: 'test-slug' };

		// When
		await get(mockReq, mockRes);

		// Then
		expect(makeRequest).toHaveBeenCalledTimes(1);
		expect(makeRequest).toHaveBeenCalledWith({
			req: mockReq,
			res: mockRes,
			collectionName: expect.any(String),
			sortBy: expect.any(String),
			sortDirection: expect.any(String),
			query: { firstName: expect.any(Object), lastName: expect.any(Object) },
		});
		expect(UsersController.get).toHaveBeenCalledTimes(1);
	});
});
