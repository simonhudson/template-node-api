import { dateOfBirthIsValid } from './dateOfBirthIsValid';

describe('dateOfBirthIsValid', () => {
	[
		{ value: '2021-01-01', expected: true },
		{ value: '2021-06-31', expected: false },
		{ value: '2021-13-1', expected: false },
		{ value: '2021-1-35', expected: false },
		{ value: null, expected: false },
		{ value: undefined, expected: false },
	].forEach((scenario) => {
		it(`should return ${scenario.expected} for ${scenario.value}`, () => {
			expect(dateOfBirthIsValid(scenario.value)).toEqual(scenario.expected);
		});
	});
});
