import type { ObjectId } from 'mongodb';

export type Department = {
	_id: ObjectId;
	name: number;
	createdAt: string;
	updatedAt: string;
};
