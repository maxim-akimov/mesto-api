import { Router } from 'express';
import cards from '../controllers/cards';

const router = Router();

router.get('/', cards.getCards);
router.get('/:cardId', cards.getCard);
router.post('/', cards.createCard);
router.delete('/:cardId', cards.deleteCard);
router.put('/:cardId/likes', cards.insertLike);
router.delete('/:cardId/likes', cards.deleteLike);

export default router;
