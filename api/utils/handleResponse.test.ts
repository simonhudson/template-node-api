import { handleResponse } from './handleResponse';
import type { BaseObject } from '@/api/types/base';
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
			json: jest.fn() as jest.Mock,
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
		handleResponse(mockReq, mockRes, response);

		// Then
		expect(mockRes.status).toHaveBeenCalledWith(400);
		expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
		expect(mockRes.json).toHaveBeenCalledWith({
			status: 400,
			metadata: { endpoint: 'orginal-url', method: 'foo' },
			error: { message: 'error-message', data: 'error-data' },
			data: [],
		});
	});
	it('should return response with data array', () => {
		// Given
		response = [{ foo: 'bar' }, { bar: 'foo' }];

		// When
		handleResponse(mockReq, mockRes, response);

		// Then
		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
		expect(mockRes.json).toHaveBeenCalledWith({
			status: 200,
			metadata: { endpoint: 'orginal-url', method: 'foo', count: 2 },
			data: [{ foo: 'bar' }, { bar: 'foo' }],
		});
	});
	it('should return response with empty data array', () => {
		// Given
		response = [];

		// When
		handleResponse(mockReq, mockRes, response);

		// Then
		expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
		expect(mockRes.json).toHaveBeenCalledWith({
			status: 200,
			metadata: { endpoint: 'orginal-url', method: 'foo', count: 0 },
			data: [],
		});
	});
	it('should return response without data array', () => {
		// When
		handleResponse(mockReq, mockRes, response);

		// Then
		expect(mockRes.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
		expect(mockRes.json).toHaveBeenCalledWith({
			status: 200,
			metadata: { endpoint: 'orginal-url', method: 'foo' },
			data: { foo: 'response-string' },
		});
	});
});
