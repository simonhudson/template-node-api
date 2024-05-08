import { del } from './delete';
import { makeRequest } from '@/utils/makeRequest';
import { UsersController } from '@/endpoints/users/controllers';
import type { Request, Response } from 'express';

jest.mock('@/utils/makeRequest');
jest.spyOn(UsersController, 'del');

describe('del', () => {
	let mockReq = {} as Request;
	let mockRes = {} as Response;

	beforeEach(() => {
		mockReq = {
			params: {},
		} as unknown as Request;
		mockRes = {
			json: jest.fn(),
		} as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should make expected request', async () => {
		// When
		await del(mockReq, mockRes);

		// Then
		expect(makeRequest).toHaveBeenCalledTimes(1);
		expect(makeRequest).toHaveBeenCalledWith({
			req: mockReq,
			res: mockRes,
			collectionName: expect.any(String),
		});
		expect(UsersController.del).toHaveBeenCalledTimes(1);
	});
});
