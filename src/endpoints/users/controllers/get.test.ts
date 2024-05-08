import { get } from './get';
import type { Response } from 'express';

describe('get', () => {
	let mockRes = {} as Response;
	let data: any;

	beforeEach(() => {
		mockRes = {
			json: jest.fn(),
		} as unknown as Response;
		data = {
			data: [{ foo: 'bar' }, { lorem: 'ipsum' }],
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should make expected request', () => {
		// When
		get(mockRes, data);

		// Then
		expect(mockRes.json).toHaveBeenCalledTimes(1);
		expect(mockRes.json).toHaveBeenCalledWith({
			data: [
				{ foo: 'bar', age: expect.any(Number), slug: expect.any(String) },
				{ lorem: 'ipsum', age: expect.any(Number), slug: expect.any(String) },
			],
		});
	});
});
