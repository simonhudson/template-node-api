import { del } from '@/endpoints/users/controllers/delete';
import { get } from '@/endpoints/users/controllers/get';
import { patch } from '@/endpoints/users/controllers/patch';
import { post } from '@/endpoints/users/controllers/post';

export const UsersController = {
	del,
	get,
	patch,
	post,
};
