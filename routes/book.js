import { Router } from 'express';
const router = Router();
import { create, getAll, getById, update, remove } from '../controllers/book.js';

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

router.get('/bestrating');
router.post('/:id/rating ');

export default router;
