import { handleResponse } from './handleResponse';
import type { BaseObject } from '@/types/base';
import type { Request, Response } from 'express';

describe('handleResponse', () => {
	let mockReq = {} as Request;
	let mockRes = {} as Response;
	let response = {} as BaseObject;

	beforeEach(() => {
		mockReq = {
			originalUrl: 'orginal-url',
			method: 'foo',
		} as unknown as Request;
		mockRes = {
			statusCode: 200,
			setHeader: jest.fn() as jest.Mock,
			status: jest.fn() as jest.Mock,
		} as unknown as Response;
		response = { foo: 'response-string' };
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return error response', () => {
		// Given
		response = { error: { message: 'error-message', data: 'error-data' } };
		mockRes.statusCode = 400;

		// When
		const actual = handleResponse(mockReq, mockRes, response);

		// Then
		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
		expect(actual).toStrictEqual({
			status: 400,
			metadata: { endpoint: 'orginal-url', method: 'foo', commitSha: expect.any(String) },
			error: { message: 'error-message', data: 'error-data' },
			data: [],
		});
	});
	it('should return response with data array', () => {
		// Given
		response = [{ foo: 'bar' }, { bar: 'foo' }];

		// When
		const actual = handleResponse(mockReq, mockRes, response);

		// Then
		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
		expect(actual).toStrictEqual({
			status: 200,
			metadata: { endpoint: 'orginal-url', method: 'foo', count: 2, commitSha: expect.any(String) },
			data: [{ foo: 'bar' }, { bar: 'foo' }],
		});
	});
	it('should return response with empty data array', () => {
		// Given
		response = [];

		// When
		const actual = handleResponse(mockReq, mockRes, response);

		// Then
		expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
		expect(actual).toStrictEqual({
			status: 200,
			metadata: { endpoint: 'orginal-url', method: 'foo', count: 0, commitSha: expect.any(String) },
			data: [],
		});
	});
	it('should return response without data array', () => {
		// When
		const actual = handleResponse(mockReq, mockRes, response);

		// Then
		expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
		expect(actual).toStrictEqual({
			status: 200,
			metadata: { endpoint: 'orginal-url', method: 'foo', commitSha: expect.any(String) },
			data: { foo: 'response-string' },
		});
	});
});
