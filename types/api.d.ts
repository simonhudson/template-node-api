import type { Request, Response } from 'express';

export type ApiRequestParams = {
	req: Request;
	collectionName: string;
	query?: {};
	sortBy?: string;
	sortDirection?: 'asc' | 'desc';
};

export type ApiBaseResponse = {
	status: number;
	metadata: {
		endpoint: string;
		method: string;
		count?: number;
	};
};

export type ApiErrorResponse = {
	data?: any;
	message?: string;
};

export interface ApiSuccessResponse extends ApiBaseResponse {
	data: any[];
	error?: ApiErrorResponse;
}
