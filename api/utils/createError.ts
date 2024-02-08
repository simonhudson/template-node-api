import type { ApiErrorResponse } from '@/api/api';

export const createError = ({ message, data }: { message?: string; data?: unknown }): ApiErrorResponse => {
	return { error: { message, data } };
};
