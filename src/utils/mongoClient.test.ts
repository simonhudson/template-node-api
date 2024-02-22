import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoClient from './mongoClient';

jest.mock('mongodb');

describe('MongoDB Connection', () => {
	let mongod: MongoMemoryServer;

	const ORIGINAL_ENV_DB_URI = process.env.DB_URI;

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create();

		(MongoClient as unknown as jest.Mock).mockImplementation(() => {
			return {
				connect: jest.fn(),
			};
		});
	});

	beforeEach(() => {
		process.env.DB_URI = ORIGINAL_ENV_DB_URI;
	});

	it('should create a new MongoClient', () => {
		expect(mongoClient).toBeDefined();
	});

	it('should attempt to connect to MongoDB', () => {
		expect(MongoClient).toHaveBeenCalledWith(process.env.DB_URI);
		expect(mongoClient.connect).toHaveBeenCalled();
	});

	afterAll(async () => {
		process.env.DB_URI = ORIGINAL_ENV_DB_URI;
		await mongod.stop();
	});
});
