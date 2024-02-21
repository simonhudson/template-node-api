import { obfuscateObject } from './obfuscateObject';
import type { BaseObject } from '@/types/base';

describe('obfuscateObject', () => {
	let testObject: BaseObject = {};

	const ORIGINAL_ENV_NODE_ENV = process.env.NODE_ENV;

	beforeEach(() => {
		testObject = {
			_id: 'id-value',
			count: 123,
			data: 'data-value',
			endpoint: 'endpoint-value',
			error: 'error-value',
			message: 'message-value',
			metadata: 'metadata-value',
			method: 'method-value',
			status: 'status-value',
			foo: 'foo-value',
			bar: 'true',
			lorem: {
				ipsum: 'ipsum-value',
				dolor: 42,
				baz: 'baz-value',
			},
			baz: [{ foo: 'foo-value-2' }, { bar: 'bar-value', woof: { foo: 'another-value' } }],
		};
		process.env.NODE_ENV = 'production';
	});

	afterEach(() => {
		process.env.NODE_ENV = ORIGINAL_ENV_NODE_ENV;
	});

	it('should not obfuscate values when in non-Production environment', () => {
		// When
		process.env.NODE_ENV = 'development';

		// Then
		expect(obfuscateObject(testObject, ['foo', 'ipsum'])).toStrictEqual(testObject);
	});

	it('should obfuscate values based on an allow list', () => {
		expect(obfuscateObject(testObject, ['foo', 'ipsum'])).toStrictEqual({
			_id: 'id-value',
			count: 123,
			data: 'data-value',
			endpoint: 'endpoint-value',
			error: 'error-value',
			message: 'message-value',
			metadata: 'metadata-value',
			method: 'method-value',
			status: 'status-value',
			foo: 'foo-value',
			bar: '[OBFUSCATED]',
			lorem: {
				ipsum: 'ipsum-value',
				dolor: 42,
				baz: '[OBFUSCATED]',
			},
			baz: [{ foo: 'foo-value-2' }, { bar: '[OBFUSCATED]', woof: { foo: 'another-value' } }],
		});
	});

	it('should obfuscate values when allow list not provided', () => {
		expect(obfuscateObject(testObject)).toStrictEqual({
			_id: 'id-value',
			count: 123,
			data: 'data-value',
			endpoint: 'endpoint-value',
			error: 'error-value',
			message: 'message-value',
			metadata: 'metadata-value',
			method: 'method-value',
			status: 'status-value',
			foo: '[OBFUSCATED]',
			bar: '[OBFUSCATED]',
			lorem: {
				ipsum: '[OBFUSCATED]',
				dolor: 42,
				baz: '[OBFUSCATED]',
			},
			baz: [{ foo: '[OBFUSCATED]' }, { bar: '[OBFUSCATED]', woof: { foo: '[OBFUSCATED]' } }],
		});
	});

	it('should obfuscate values with provided replacement', () => {
		expect(obfuscateObject(testObject, undefined, 'some-replacement')).toStrictEqual({
			_id: 'id-value',
			count: 123,
			data: 'data-value',
			endpoint: 'endpoint-value',
			error: 'error-value',
			message: 'message-value',
			metadata: 'metadata-value',
			method: 'method-value',
			status: 'status-value',
			foo: 'some-replacement',
			bar: 'some-replacement',
			lorem: {
				ipsum: 'some-replacement',
				dolor: 42,
				baz: 'some-replacement',
			},
			baz: [{ foo: 'some-replacement' }, { bar: 'some-replacement', woof: { foo: 'some-replacement' } }],
		});
	});
	it('should obfuscate values with an allow list and provided replacement', () => {
		expect(obfuscateObject(testObject, ['bar'], 'xxx')).toStrictEqual({
			_id: 'id-value',
			count: 123,
			data: 'data-value',
			endpoint: 'endpoint-value',
			error: 'error-value',
			message: 'message-value',
			metadata: 'metadata-value',
			method: 'method-value',
			status: 'status-value',
			foo: 'xxx',
			bar: 'true',
			lorem: {
				ipsum: 'xxx',
				dolor: 42,
				baz: 'xxx',
			},
			baz: [{ foo: 'xxx' }, { bar: 'bar-value', woof: { foo: 'xxx' } }],
		});
	});
});
