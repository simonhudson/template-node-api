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
	error?: {
		data?: any;
		message?: string;
	};
};

export interface ApiSuccessResponse extends ApiBaseResponse, ApiErrorResponse {
	data: any[];
}
