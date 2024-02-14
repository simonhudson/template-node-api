import type { Request, Response } from 'express';

export type ApiRequestParams = {
	req: Request;
	collectionName: string;
	query?: {};
	sortBy?: string;
	sortDirection?: 'asc' | 'desc';
};

export type ApiErrorResponse = {
	error: {
		data?: any;
		message?: string;
	};
};
