import express, { Request, Response } from 'express';
const router = express.Router();
import { makeRequest } from '@/api/utils/makeRequest';

const COLLECTION_NAME = 'users';

router.get('/', async (req: Request, res: Response) =>
	makeRequest({ req, res, collectionName: COLLECTION_NAME, sortBy: 'last_name', sortDirection: 'asc' })
);
router.post('/', async (req: Request, res: Response) => makeRequest({ req, res, collectionName: COLLECTION_NAME }));
// router.patch('/', async (req: Request, res: Response) => makeRequest({ req, res, collectionName: COLLECTION_NAME }));
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
