import { sanitizeString } from './sanitizeString';

describe('sanitizeString', () => {
	it('should sanitize string', () => {
		expect(sanitizeString('<alert>hello</alert>')).toEqual('&lt;alert&gt;hello&lt;/alert&gt;');
	});
});
