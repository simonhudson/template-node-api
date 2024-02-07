import { httpStatusCodes } from '@/api/constants/httpStatusCodes';}
import type { ApiErrorResponse } from '@/api/api';

export const createErrorResponse = ({ status, message }: ApiErrorResponse) => {
	return {
        status: status || httpStatusCodes.UNKOWN_ERROR,
        message: message || 'An unknown error occurred',
    };
};
