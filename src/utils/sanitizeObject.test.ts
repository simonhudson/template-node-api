import { sanitizeObject } from './sanitizeObject';

describe('sanitizeObject', () => {
	it('should sanitize string values', () => {
		// When
		const actual = sanitizeObject({
			foo: '<script>alert("hello")</script>',
			bar: true,
			lorem: {
				ipsum: ['<script>alert("hello")</script>', '<script>alert("goodbye")</script>'],
				dolor: 42,
			},
			ipsum: [{ foo: '<script>alert("hello")</script>' }, { bar: '<script>alert("goodbye")</script>' }],
		});

		expect(actual).toEqual({
			foo: '&lt;script&gt;alert("hello")&lt;/script&gt;',
			bar: true,
			lorem: {
				ipsum: ['&lt;script&gt;alert("hello")&lt;/script&gt;', '&lt;script&gt;alert("goodbye")&lt;/script&gt;'],
				dolor: 42,
			},
			ipsum: [
				{ foo: '&lt;script&gt;alert("hello")&lt;/script&gt;' },
				{ bar: '&lt;script&gt;alert("goodbye")&lt;/script&gt;' },
			],
		});
	});
});
