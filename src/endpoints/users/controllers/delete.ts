import type { ApiSuccessResponse, ApiErrorResponse } from '@/types/api';
import type { Response } from 'express';

export const del = (res: Response, data: ApiSuccessResponse | ApiErrorResponse): void => {
	res.json(data);
};
