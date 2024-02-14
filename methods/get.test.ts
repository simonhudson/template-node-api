import { createError } from '@/utils/createError';
import { get, ApiGetParams } from './get';
import type { Db } from 'mongodb';

jest.mock('@/utils/createError');

describe('get', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const mockDb = {
		collection: jest.fn().mockReturnThis(),
		find: jest.fn().mockReturnThis(),
		sort: jest.fn().mockReturnThis(),
		toArray: jest.fn().mockResolvedValue(true),
	} as unknown as Db;
	const collectionName = 'test';

	describe(`should make expected call to database`, () => {
		const query = { foo: 'bar' };
		const sortBy = 'baz';
		const sortDirectionAsc = 'asc';
		const sortDirectionDesc = 'desc';

		afterEach(() => {
			jest.clearAllMocks();
		});

		it('with no modifiers', async () => {
			// When
			await get({ collectionName, db: mockDb } as unknown as ApiGetParams);

			// Then
			expect(mockDb.collection).toHaveBeenCalledWith('test');
			expect(mockDb.collection(collectionName).find).toHaveBeenCalledWith({});
			expect(mockDb.collection(collectionName).find({}).sort).toHaveBeenCalledWith({});
			expect(mockDb.collection(collectionName).find({}).sort({}).toArray).toHaveBeenCalledTimes(1);
		});
		it('with a query', async () => {
			// When
			await get({ collectionName, db: mockDb, query } as unknown as ApiGetParams);

			// Then
			expect(mockDb.collection).toHaveBeenCalledWith('test');
			expect(mockDb.collection(collectionName).find).toHaveBeenCalledWith(query);
			expect(mockDb.collection(collectionName).find({}).sort).toHaveBeenCalledWith({});
			expect(mockDb.collection(collectionName).find({}).sort({}).toArray).toHaveBeenCalledTimes(1);
		});
		it('with a query and a sort', async () => {
			// When
			await get({ collectionName, db: mockDb, query, sortBy } as unknown as ApiGetParams);

			// Then
			expect(mockDb.collection).toHaveBeenCalledWith('test');
			expect(mockDb.collection(collectionName).find).toHaveBeenCalledWith(query);
			expect(mockDb.collection(collectionName).find({}).sort).toHaveBeenCalledWith({ baz: -1 });
			expect(mockDb.collection(collectionName).find({}).sort({}).toArray).toHaveBeenCalledTimes(1);
		});
		it('with a query and a sort and ascending sort direction', async () => {
			// When
			await get({
				collectionName,
				db: mockDb,
				query,
				sortBy,
				sortDirection: sortDirectionAsc,
			} as unknown as ApiGetParams);

			// Then
			expect(mockDb.collection).toHaveBeenCalledWith('test');
			expect(mockDb.collection(collectionName).find).toHaveBeenCalledWith(query);
			expect(mockDb.collection(collectionName).find({}).sort).toHaveBeenCalledWith({ baz: 1 });
			expect(mockDb.collection(collectionName).find({}).sort({}).toArray).toHaveBeenCalledTimes(1);
		});
		it('with a query and a sort and descending sort direction', async () => {
			// When
			await get({
				collectionName,
				db: mockDb,
				query,
				sortBy,
				sortDirection: sortDirectionDesc,
			} as unknown as ApiGetParams);

			// Then
			expect(mockDb.collection).toHaveBeenCalledWith('test');
			expect(mockDb.collection(collectionName).find).toHaveBeenCalledWith(query);
			expect(mockDb.collection(collectionName).find({}).sort).toHaveBeenCalledWith({ baz: -1 });
			expect(mockDb.collection(collectionName).find({}).sort({}).toArray).toHaveBeenCalledTimes(1);
		});
	});
	it('should return the expected response', async () => {
		// Given
		const mockResponse = [{ foo: 'bar' }];
		mockDb.collection(collectionName).find().sort({}).toArray = jest.fn().mockResolvedValue(mockResponse as any);

		// When
		const response = await get({ collectionName, db: mockDb } as unknown as ApiGetParams);

		// Then
		expect(response).toEqual(mockResponse);
	});
	it('should handle errors', async () => {
		const mockResponse = 'Whoops!';
		mockDb.collection(collectionName).find().sort({}).toArray = jest.fn().mockRejectedValue(mockResponse as any);

		// When
		await get({ collectionName, db: mockDb } as unknown as ApiGetParams);

		// Then
		expect(createError).toHaveBeenCalledWith({ data: 'Whoops!' });
	});
});
