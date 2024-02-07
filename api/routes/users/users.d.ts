import { ObjectId } from 'mongodb';

export type User = {
	_id?: ObjectId;
	date_of_birth?: string;
	first_name?: string;
	last_name?: string;
};
