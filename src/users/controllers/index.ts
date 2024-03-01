import { del } from '@/users/controllers/delete';
import { get } from '@/users/controllers/get';
import { patch } from '@/users/controllers/patch';
import { post } from '@/users/controllers/post';

export const UsersController = {
	del,
	get,
	patch,
	post,
};
