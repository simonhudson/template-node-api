import { createError } from '@/utils/createError';
import { patch, ApiPatchParams } from './patch';
import type { Db } from 'mongodb';
import type { Request } from 'express';

jest.mock('@/utils/createError');

describe('patch', () => {
	let mockReq: Request;
	let mockDb: Db;
	const collectionName = 'test';

	beforeEach(() => {
		mockReq = {
			body: { _id: '65c47f9640783fa3a7e6f195', foo: 'bar' },
		} as unknown as Request;

		mockDb = {
			collection: jest.fn().mockReturnThis(),
			updateOne: jest.fn().mockResolvedValue(true),
		} as unknown as Db;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it(`should make expected call to database`, async () => {
		// When
		await patch({ req: mockReq, collectionName, db: mockDb } as unknown as ApiPatchParams);

		// Then
		expect(mockDb.collection).toHaveBeenCalledWith('test');
		expect(mockDb.collection(collectionName).updateOne).toHaveBeenCalledWith(
			{ _id: expect.any(Object) },
			{
				$set: {
					foo: 'bar',
					updatedAt: expect.any(Date),
				},
			}
		);
	});
	it('should return the expected response', async () => {
		// Given
		const mockResponse = [{ foo: 'bar' }];
		mockDb.collection(collectionName).updateOne = jest.fn().mockResolvedValue(mockResponse as any);

		// When
		const response = await patch({ req: mockReq, collectionName, db: mockDb } as unknown as ApiPatchParams);

		// Then
		expect(response).toEqual(mockResponse);
	});
	it('should handle errors', async () => {
		// Given
		const mockResponse = 'Whoops!';
		mockDb.collection(collectionName).updateOne = jest.fn().mockRejectedValue(mockResponse as any);

		// When
		await patch({ req: mockReq, collectionName, db: mockDb } as unknown as ApiPatchParams);

		// Then
		expect(createError).toHaveBeenCalledWith({ data: 'Whoops!' });
	});
});
