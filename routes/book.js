import { Router } from 'express';
const router = Router();
import auth from '../middlewares/auth.js';
import multer from '../middlewares/multer-config.js';
import sharp from '../middlewares/sharp.js';
import * as book from '../controllers/book.js';

router.post('/', auth, multer, sharp, book.create);
router.get('/', book.getAll);

router.get('/bestrating', book.getBestRating);
router.post('/:id/rating', auth, book.voteById);

router.get('/:id', book.getById);
router.put('/:id', auth, multer, sharp, book.update);
router.delete('/:id', auth, book.remove);

export default router;
