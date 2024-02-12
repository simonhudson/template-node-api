import { createError } from '@/api/utils/createError';
import { handleResponse } from '../utils/handleResponse';
import { post, ApiPostParams } from './post';
import type { Db } from 'mongodb';
import type { Request } from 'express';

jest.mock('@/api/utils/createError');
jest.mock('@/api/utils/handleResponse');

describe('post', () => {
	let mockReq, mockRes, mockDb;
	const collectionName = 'test';

	beforeEach(() => {
		mockReq = {
			body: { _id: '65c47f9640783fa3a7e6f195' },
		} as unknown as Request;

		mockRes = {
			setHeader: jest.fn() as jest.Mock,
			status: jest.fn() as jest.Mock,
			json: jest.fn() as jest.Mock,
		} as unknown as Request;

		mockDb = {
			collection: jest.fn().mockReturnThis(),
			insertOne: jest.fn().mockResolvedValue(true),
		} as unknown as Db;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it(`should handle absence of request body`, async () => {
		// Given
		mockReq.body = {};

		// When
		await post({ req: mockReq, res: mockRes, collectionName, db: mockDb } as unknown as ApiPostParams);

		// Then
		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(handleResponse).toHaveBeenCalledTimes(1);
		expect(createError).toHaveBeenCalledWith({ message: 'No request body provided' });
		expect(mockDb.collection).not.toHaveBeenCalled;
	});
	it(`should make expected call to database`, async () => {
		// When
		await post({ req: mockReq, res: mockRes, collectionName, db: mockDb } as unknown as ApiPostParams);

		// Then
		expect(mockDb.collection).toHaveBeenCalledWith('test');
		expect(mockDb.collection(collectionName).insertOne).toHaveBeenCalledWith({
			_id: '65c47f9640783fa3a7e6f195',
			created_at: expect.any(Date),
			updated_at: expect.any(Date),
		});
	});
	it('should return the expected response', async () => {
		// Given
		const mockResponse = [{ foo: 'bar' }];
		mockDb.collection(collectionName).insertOne.mockResolvedValue(mockResponse as any);

		// When
		const response = await post({
			req: mockReq,
			res: mockRes,
			collectionName,
			db: mockDb,
		} as unknown as ApiPostParams);

		// Then
		expect(response).toEqual(mockResponse);
	});
	it('should handle errors', async () => {
		// Given
		mockDb.collection(collectionName).insertOne.mockRejectedValue('Whoops!' as any);

		// When
		await post({ req: mockReq, res: mockRes, collectionName, db: mockDb } as unknown as ApiPostParams);

		// Then
		expect(createError).toHaveBeenCalledWith({ data: 'Whoops!' });
	});
});
