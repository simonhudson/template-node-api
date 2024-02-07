import { Request, Response } from 'express';

export type ApiRequestParams = {
	req?: Request;
	res?: Response;
	collectionName: string;
	query?: {};
	sortBy?: string;
	sortDirection?: 'asc' | 'desc';
};

export type ApiErrorResponse = {
	status?: number;
	message: string;
};
