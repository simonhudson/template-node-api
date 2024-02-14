import { createError } from '@/utils/createError';
import { del, ApiDeleteParams } from './delete';
import type { Db } from 'mongodb';
import type { Request } from 'express';

jest.mock('@/utils/createError');

describe('delete', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const mockReq = {
		body: { _id: '65c47f9640783fa3a7e6f195' },
	} as unknown as Request;

	const mockDb = {
		collection: jest.fn().mockReturnThis(),
		deleteOne: jest.fn().mockResolvedValue(true),
	} as unknown as Db;

	const collectionName = 'test';

	it(`should make expected call to database`, async () => {
		// When
		await del({ req: mockReq, collectionName, db: mockDb } as unknown as ApiDeleteParams);

		// Then
		expect(mockDb.collection).toHaveBeenCalledWith('test');
		expect(mockDb.collection(collectionName).deleteOne).toHaveBeenCalledWith({ _id: expect.any(Object) });
	});
	it('should return the expected response', async () => {
		// Given
		const mockResponse = [{ foo: 'bar' }];
		mockDb.collection(collectionName).deleteOne = jest.fn().mockResolvedValue(mockResponse as any);

		// When
		const response = await del({ req: mockReq, collectionName, db: mockDb } as unknown as ApiDeleteParams);

		// Then
		expect(response).toEqual(mockResponse);
	});
	it('should handle errors', async () => {
		// Given
		const mockResponse = 'Whoops!';
		mockDb.collection(collectionName).deleteOne = jest.fn().mockRejectedValue(mockResponse as any);

		// When
		await del({ req: mockReq, collectionName, db: mockDb } as unknown as ApiDeleteParams);

		// Then
		expect(createError).toHaveBeenCalledWith({ data: 'Whoops!' });
	});
});
