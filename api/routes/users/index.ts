import { del } from './delete';
import { get, getUser } from './get';
import { patch } from './patch';
import { post } from './post';
import express from 'express';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => get(req, res));
router.post('/', async (req: express.Request, res: express.Response) => post(req, res));
router.patch('/', async (req: express.Request, res: express.Response) => patch(req, res));
router.delete('/', async (req: express.Request, res: express.Response) => del(req, res));

// Keep this :slug route last to allow for other routes to be hit first
router.get('/:slug', async (req: express.Request, res: express.Response) => getUser(req, res));

export default router;
