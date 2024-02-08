import { preparePayloadForInsertion } from './preparePayloadForInsertion';
import { sanitizeObject } from '@/api/utils/sanitizeObject';
import { sortObjectByKey } from '@/api/utils/sortObjectByKey';

jest.mock('@/api/utils/sanitizeObject');
jest.mock('@/api/utils/sortObjectByKey');

describe('preparePayloadForInsertion', () => {
	it('should call sorting and sanitizing functions', () => {
		// When
		preparePayloadForInsertion({ foo: 'bar' });

		// Then
		expect(sortObjectByKey).toHaveBeenCalledTimes(1);
		expect(sanitizeObject).toHaveBeenCalledTimes(1);
	});
});
