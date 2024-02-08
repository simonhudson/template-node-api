import { sanitizeObject } from './sanitizeObject';

describe('sanitizeObject', () => {
	it('should sanitize string values', () => {
		// When
		const actual = sanitizeObject({
			foo: '<alert>hello</alert>',
			bar: true,
			lorem: {
				ipsum: ['<alert>hello</alert>', '<alert>goodbye</alert>'],
				dolor: 42,
			},
			ipsum: [{ foo: '<alert>hello</alert>' }, { bar: '<alert>goodbye</alert>' }],
		});
		expect(actual).toEqual({
			foo: '&lt;alert&gt;hello&lt;/alert&gt;',
			bar: true,
			lorem: {
				ipsum: ['&lt;alert&gt;hello&lt;/alert&gt;', '&lt;alert&gt;goodbye&lt;/alert&gt;'],
				dolor: 42,
			},
			ipsum: [{ foo: '&lt;alert&gt;hello&lt;/alert&gt;' }, { bar: '&lt;alert&gt;goodbye&lt;/alert&gt;' }],
		});
	});
});
