import { Db } from 'mongodb';
import { createError } from '@/api/utils/createError';
import { handleResponse } from '@/api/utils/handleResponse';
import { OptionalId } from 'mongodb';
import { sanitizePayload } from '@/api/utils/sanitizePayload';
import { ApiRequestParams } from '@/api/api';

interface PostParams extends ApiRequestParams {
	db: Db;
}

export const post = async ({ req, res, collectionName, db }: PostParams) => {
	const requestBody = req.body;

	if (!Object.keys(requestBody).length) return createError('No request body provided');

	try {
		const response = await db
			.collection(collectionName)
			.insertOne(sanitizePayload(requestBody) as OptionalId<Document>);
		handleResponse(req, res, response);
	} catch (error: unknown) {
		createError({ error });
	}
};

// const payload: Player = {
// 	age: dayjs().diff(dayjs(requestBody.date_of_birth), 'year'),
// 	date_of_birth: requestBody.date_of_birth,
// 	first_name: requestBody.first_name,
// 	is_captain: requestBody.is_captain,
// 	is_vice_captain: requestBody.is_vice_captain,
// 	last_name: requestBody.last_name,
// 	nationality: requestBody.nationality,
// 	on_loan_from: requestBody.on_loan_from,
// 	on_loan_to: requestBody.on_loan_to,
// 	position: requestBody.position,
// 	slug: slugify(`${requestBody.first_name} ${requestBody.last_name}`),
// 	squad_number: requestBody.squad_number,
// };

// const existingName = await db
// 	.collection(collectionName)
// 	.find({
// 		slug: payload.slug,
// 		first_name: payload.first_name,
// 		last_name: payload.last_name,
// 		squad_number: payload.squad_number,
// 	})
// 	.toArray();

// if (!!existingName.length) {

// 	const getErrorDetails = () => {
// 		if (existingName.length) {
// 			return {
// 				message: `Player '${payload.first_name} ${payload.last_name}' with squad number ${payload.squad_number} already exists`,
// 				info: existingName,
// 			};
// 		}
// 	};

// 	const errorDetails: ErrorDetails = getErrorDetails();

// 	return handleError.badRequest(res, {
// 		collection: collectionName,
// 		method: 'POST',
// 		message: errorDetails.message,
// 		info: errorDetails.info,
// 	});
// }
