import { obfuscateObject } from './obfuscateObject';
import type { BaseObject } from '@/types/base';

describe('obfuscateObject', () => {
	let testObject: BaseObject = {};

	beforeEach(() => {
		testObject = {
			foo: 'foo-value',
			bar: 'true',
			lorem: {
				ipsum: 'ipsum-value',
				dolor: 42,
				baz: 'baz-value',
			},
			baz: [{ foo: 'foo-value-2' }, { bar: 'bar-value', woof: { foo: 'another-value' } }],
		};
	});

	it('should obfuscate string values based on an allow list', () => {
		expect(obfuscateObject(testObject, ['foo', 'ipsum'])).toEqual({
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

	it('should obfuscate all string values when allow list not provided', () => {
		expect(obfuscateObject(testObject)).toEqual({
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

	it('should obfuscate all string values with provided replacement', () => {
		expect(obfuscateObject(testObject, undefined, 'some-replacement')).toEqual({
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
});