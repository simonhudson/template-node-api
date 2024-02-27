import mongoClient from '@/utils/mongoClient';
import type { BaseObject } from '@/types/base';
import type { WithId, MongoClient } from 'mongodb';

export const getDuplicateEntries = async (
	collectionName: string,
	body: BaseObject,
	keysToCheck: string[] = Object.keys(body)
): Promise<WithId<any>[]> => {
	const client: MongoClient = mongoClient;
	const db = client.db(process.env.DB_NAME);

	const objectToCheck: BaseObject = {};
	keysToCheck.forEach((key): void => {
		objectToCheck[key] = body[key];
	});

	const duplicateEntries = await db.collection(collectionName).find(objectToCheck).toArray();
	return duplicateEntries;
};
