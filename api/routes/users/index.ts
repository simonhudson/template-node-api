import { createError } from '@/api/utils/createError';
import { handleResponse } from '@/api/utils/handleResponse';
import { makeRequest } from '@/api/utils/makeRequest';
import { MongoClient } from 'mongodb';
import { slugify } from '@/api/utils/slugify';
import dayjs from 'dayjs';
import express, { Request, Response } from 'express';
import mongoClient from '@/api/utils/mongoClient';

const router = express.Router();

const COLLECTION_NAME = 'users';

router.get('/', async (req: Request, res: Response) =>
	makeRequest({ req, res, collectionName: COLLECTION_NAME, sortBy: 'last_name', sortDirection: 'asc' })
);
router.post('/', async (req: Request, res: Response) => {
	const requestBody = req.body;
	const client: MongoClient = mongoClient;
	const db = client.db(process.env.DB_NAME);

	const existingEntry = await db
		.collection(COLLECTION_NAME)
		.find({
			first_name: requestBody.first_name,
			last_name: requestBody.last_name,
			date_of_birth: requestBody.date_of_birth,
		})
		.toArray();

	if (existingEntry.length) {
		handleResponse(
			req,
			res,
			createError(
				`Duplicate entry found for ${requestBody.first_name} ${requestBody.last_name} with D.O.B ${requestBody.date_of_birth}`
			)
		);
	} else {
		requestBody.slug = slugify(`${requestBody.first_name} ${requestBody.last_name}`);
		requestBody.age = dayjs().diff(dayjs(requestBody.date_of_birth), 'year');
		makeRequest({ req, res, collectionName: COLLECTION_NAME });
	}
});
router.patch('/', async (req: Request, res: Response) => {
	const requestBody = req.body;

	requestBody.slug = slugify(`${requestBody.first_name} ${requestBody.last_name}`);
	requestBody.age = dayjs().diff(dayjs(requestBody.date_of_birth), 'year');
	makeRequest({ req, res, collectionName: COLLECTION_NAME });
});
// router.delete('/', async (req: Request, res: Response) => makeRequest({ req, res, collectionName: COLLECTION_NAME }));

// router.get('/captain', async (req: Request, res: Response) =>
// 	makeRequest({ req, res, collectionName: COLLECTION_NAME, query: { is_captain: true } })
// );
// router.get('/vicecaptain', async (req: Request, res: Response) =>
// 	makeRequest({ req, res, collectionName: COLLECTION_NAME, query: { is_vice_captain: true } })
// );
// router.get('/loan', async (req: Request, res: Response) =>
// 	makeRequest({
// 		req,
// 		res,
// 		collectionName: COLLECTION_NAME,
// 		query: {
// 			$or: [
// 				{
// 					on_loan_from: {
// 						$ne: null,
// 					},
// 				},
// 				{
// 					on_loan_to: {
// 						$ne: null,
// 					},
// 				},
// 			],
// 		},
// 	})
// );
// router.get('/loan/in', async (req: Request, res: Response) =>
// 	makeRequest({
// 		req,
// 		res,
// 		collectionName: COLLECTION_NAME,
// 		query: { on_loan_from: { $ne: null } },
// 	})
// );
// router.get('/loan/out', async (req: Request, res: Response) =>
// 	makeRequest({
// 		req,
// 		res,
// 		collectionName: COLLECTION_NAME,
// 		query: { on_loan_to: { $ne: null } },
// 	})
// );

// // Keep this :slug route last to allow for other routes to be hit
// router.get('/:slug', async (req: Request, res: Response) =>
// 	makeRequest({
// 		req,
// 		res,
// 		collectionName: COLLECTION_NAME,
// 		query: { slug: req.params.slug },
// 	})
// );

export default router;
