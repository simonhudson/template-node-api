import { createError } from '@/utils/createError';
import { del } from '@/methods/delete';
import { get } from '@/methods/get';
import { handleResponse } from '@/utils/handleResponse';
import { makeRequest } from './makeRequest';
import { patch } from '@/methods/patch';
import { post } from '@/methods/post';
import mongoClient from '@/utils/mongoClient';
import type { Db } from 'mongodb';
import type { Request, Response } from 'express';

jest.mock('@/utils/createError');
jest.mock('@/utils/handleResponse');
jest.mock('@/utils/mongoClient');
jest.mock('mongodb');

jest.mock('@/methods/delete');
jest.mock('@/methods/get');
jest.mock('@/methods/patch');
jest.mock('@/methods/post');

describe('makeRequest', () => {
	let mockReq = {} as Request;
	let mockRes = {} as Response;
	let db = {} as Db;
	const collectionName = 'test-collection';

	beforeEach(() => {
		mockReq = {} as unknown as Request;
		mockRes = {
			status: jest.fn() as jest.Mock,
		} as unknown as Response;

		mongoClient.db = jest.fn().mockReturnValue(db);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

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
		expect(mongoClient.db).not.toHaveBeenCalled();
	});
	it('should create DB connection', async () => {
		// Given
		mockReq.method = 'GET';

		// When
		await makeRequest({ req: mockReq, res: mockRes, collectionName });

		// Then
		expect(mongoClient.db).toHaveBeenCalledTimes(1);
	});
	it('should handle GET request', async () => {
		// Given
		mockReq.method = 'GET';

		// When
		await makeRequest({ req: mockReq, res: mockRes, collectionName });

		// Then
		expect(get).toHaveBeenCalledTimes(1);
		expect(get).toHaveBeenCalledWith({ req: mockReq, res: mockRes, collectionName, db });
		expect(handleResponse).toHaveBeenCalledTimes(1);
	});
	it('should handle POST request', async () => {
		// Given
		mockReq.method = 'POST';

		// When
		await makeRequest({ req: mockReq, res: mockRes, collectionName });

		// Then
		expect(post).toHaveBeenCalledTimes(1);
		expect(post).toHaveBeenCalledWith({ req: mockReq, res: mockRes, collectionName, db });
		expect(handleResponse).toHaveBeenCalledTimes(1);
	});
	it('should handle PATCH request', async () => {
		// Given
		mockReq.method = 'PATCH';

		// When
		await makeRequest({ req: mockReq, res: mockRes, collectionName });

		// Then
		expect(patch).toHaveBeenCalledTimes(1);
		expect(patch).toHaveBeenCalledWith({ req: mockReq, collectionName, db });
		expect(handleResponse).toHaveBeenCalledTimes(1);
	});
	it('should handle DELETE request', async () => {
		// Given
		mockReq.method = 'DELETE';

		// When
		await makeRequest({ req: mockReq, res: mockRes, collectionName });

		// Then
		expect(del).toHaveBeenCalledTimes(1);
		expect(del).toHaveBeenCalledWith({ req: mockReq, collectionName, db });
		expect(handleResponse).toHaveBeenCalledTimes(1);
	});
});
