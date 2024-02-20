import type { ApiErrorResponse } from '@/types/api';

export const createError = ({ message, data }: { message?: string; data?: unknown }): ApiErrorResponse => {
	return { message, data };
};
