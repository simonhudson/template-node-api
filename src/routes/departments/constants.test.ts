import * as constants from './constants';

describe('constants', () => {
	it('should return expected values', () => {
		expect(constants).toEqual({
			COLLECTION_NAME: 'departments',
		});
	});
});
