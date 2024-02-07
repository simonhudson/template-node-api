import type { ApiErrorResponse } from '@/api/api';

export const createError = (error: unknown): ApiErrorResponse => {
	return { error };
};
