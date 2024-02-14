import { getDuplicateEntries } from './getDuplicateEntries';
import mongoClient from '@/utils/mongoClient';
import type { BaseObject } from '@/types/base';

jest.mock('mongodb');
jest.mock('@/utils/mongoClient');

describe('getDuplicateEntries', () => {
	let requestBody: BaseObject = {};
	let mockToArray: jest.Mock = jest.fn();
	const collectionName = 'test-collection';

	beforeEach(() => {
		requestBody = {
			foo: 1,
			bar: 'baz',
			lorem: 'ipsum',
		};

		mongoClient.db = jest.fn().mockReturnValue({
			collection: jest.fn().mockReturnThis(),
			find: jest.fn().mockReturnThis(),
			toArray: mockToArray,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('should call database', () => {
		const assertCommonCalls = () => {
			expect(mongoClient.db).toHaveBeenCalledTimes(1);
			expect(mongoClient.db().collection).toHaveBeenCalledTimes(1);
			expect(mongoClient.db().collection).toHaveBeenCalledWith('test-collection');
			expect(mongoClient.db().collection(collectionName).find).toHaveBeenCalledTimes(1);
			expect(mongoClient.db().collection(collectionName).find(requestBody).toArray).toHaveBeenCalledTimes(1);
		};

		it('with no specified keys', async () => {
			// When
			await getDuplicateEntries(collectionName, requestBody);

			// Then
			assertCommonCalls();
			expect(mongoClient.db().collection(collectionName).find).toHaveBeenCalledWith(requestBody);
		});
		it('with specified keys', async () => {
			// When
			await getDuplicateEntries(collectionName, requestBody, ['lorem', 'foo']);

			// Then
			assertCommonCalls();
			expect(mongoClient.db().collection(collectionName).find).toHaveBeenCalledWith({
				foo: 1,
				lorem: 'ipsum',
			});
		});
	});

	describe('should return expected results', () => {
		it('when no duplicates are found', async () => {
			// Given
			mockToArray.mockResolvedValue([]);

			// When
			const actual = await getDuplicateEntries(collectionName, requestBody);

			// Then
			expect(actual).toEqual([]);
		});

		it('when duplicates are found', async () => {
			// Given
			const mockResponse = [
				{ foo: 1, bar: 'baz' },
				{ foo: 1, bar: 'baz' },
			];
			mockToArray.mockResolvedValue(mockResponse);

			// When
			const actual = await getDuplicateEntries(collectionName, requestBody);

			// Then
			expect(actual).toEqual(mockResponse);
		});
	});
});
