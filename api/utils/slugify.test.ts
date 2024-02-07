import { slugify } from './slugify';

describe('slugify', () => {
	[
		{ input: 'Foo', expected: 'foo' },
		{ input: 'Foo Bar', expected: 'foo-bar' },
		{ input: `  123Foo456Bar_hello Lorem ipsum--dolor  x  `, expected: '123foo456bar_hello-lorem-ipsum--dolor-x' },
	].forEach((scenario) => {
		it(`should return ${scenario.expected} for input ${scenario.input}`, () => {
			expect(slugify(scenario.input)).toEqual(scenario.expected);
		});
	});
});
