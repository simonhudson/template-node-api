import express from 'express';
import { get } from './get';
import { post } from './post';
import { patch } from './patch';
import { del } from './delete';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => get(req, res));
router.post('/', async (req: express.Request, res: express.Response) => post(req, res));
router.patch('/', async (req: express.Request, res: express.Response) => patch(req, res));
router.delete('/', async (req: express.Request, res: express.Response) => del(req, res));

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
