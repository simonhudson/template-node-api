import type { ObjectId } from 'mongodb';

export type User = {
	_id: ObjectId;
	age: number;
	createdAt: string;
	dateOfBirth: string;
	firstName: string;
	lastName: string;
	slug: string;
	updatedAt: string;
};
