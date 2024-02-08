import { sortObjectByKey } from './sortObjectByKey';

describe('sortObjectByKey', () => {
	it('should return sorted object', () => {
		expect(
			sortObjectByKey({
				charlie: 'value-charlie',
				tango: { foo: 'value-tango-foo', bar: 'value-tango-bar' },
				'foxtrot-1': 'value-foxtrot-1',
				alpha: ['value-alpha-1', 'value-alpha-2'],
				delta: 123,
			})
		).toEqual({
			alpha: ['value-alpha-1', 'value-alpha-2'],
			charlie: 'value-charlie',
			delta: 123,
			'foxtrot-1': 'value-foxtrot-1',
			tango: { foo: 'value-tango-foo', bar: 'value-tango-bar' },
		});
	});
});
