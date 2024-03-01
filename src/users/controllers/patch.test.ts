import { patch } from './patch';
import type { Response } from 'express';

describe('patch', () => {
	let mockRes = {} as Response;
	let data: any;

	beforeEach(() => {
		mockRes = {
			json: jest.fn(),
		} as unknown as Response;
		data = 'foo';
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should make expected request', () => {
		// When
		patch(mockRes, data);

		// Then
		expect(mockRes.json).toHaveBeenCalledTimes(1);
		expect(mockRes.json).toHaveBeenCalledWith('foo');
	});
});
