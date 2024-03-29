import { del } from './delete';
import { get } from './get';
import { patch } from './patch';
import { post } from './post';
import express from 'express';

const router = express.Router();

router.get(['/', '/:slug'], async (req: express.Request, res: express.Response): Promise<void> => get(req, res));
router.post('/', async (req: express.Request, res: express.Response): Promise<void> => post(req, res));
router.patch('/', async (req: express.Request, res: express.Response): Promise<void> => patch(req, res));
router.delete('/', async (req: express.Request, res: express.Response): Promise<void> => del(req, res));

export default router;
