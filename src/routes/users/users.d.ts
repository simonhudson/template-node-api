import { ObjectId } from 'mongodb';

export type User = {
	_id: ObjectId;
	age: number;
	created_at: string;
	date_of_birth: string;
	first_name: string;
	last_name: string;
	slug: string;
};
