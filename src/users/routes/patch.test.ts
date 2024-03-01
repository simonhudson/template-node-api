import { patch } from './patch';
import { makeRequest } from '@/utils/makeRequest';
import { UsersController } from '@/users/controllers';
import type { Request, Response } from 'express';

jest.mock('@/utils/makeRequest');
jest.spyOn(UsersController, 'patch');

describe('patch', () => {
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
		await patch(mockReq, mockRes);

		// Then
		expect(makeRequest).toHaveBeenCalledTimes(1);
		expect(makeRequest).toHaveBeenCalledWith({
			req: mockReq,
			res: mockRes,
			collectionName: expect.any(String),
		});
		expect(UsersController.patch).toHaveBeenCalledTimes(1);
	});
});
