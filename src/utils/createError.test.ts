import { createError } from './createError';

describe('createError', () => {
	it('should handle absence of input', () => {
		expect(createError({})).toEqual({ error: { message: undefined, data: undefined } });
	});
	it('should return with message', () => {
		expect(createError({ message: 'Test message' })).toEqual({
			error: { message: 'Test message', data: undefined },
		});
	});
	it('should return with data', () => {
		expect(createError({ data: 'Test data' })).toEqual({ error: { message: undefined, data: 'Test data' } });
	});
	it('should return with message and data', () => {
		expect(createError({ message: 'Test message', data: 'Test data' })).toEqual({
			error: { message: 'Test message', data: 'Test data' },
		});
	});
});
