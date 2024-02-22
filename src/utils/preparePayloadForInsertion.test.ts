import { preparePayloadForInsertion } from './preparePayloadForInsertion';
import { sanitizeObject } from '@/utils/sanitizeObject';
import { sortObjectByKey } from '@/utils/sortObjectByKey';

jest.mock('@/utils/sanitizeObject');
jest.mock('@/utils/sortObjectByKey');

describe('preparePayloadForInsertion', () => {
	it('should call sorting and sanitizing functions', () => {
		// When
		preparePayloadForInsertion({ foo: 'bar' });

		// Then
		expect(sortObjectByKey).toHaveBeenCalledTimes(1);
		expect(sanitizeObject).toHaveBeenCalledTimes(1);
	});
});
