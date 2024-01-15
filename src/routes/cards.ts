import { Router } from 'express';
import cards from '../controllers/cards';

const router = Router();

router.get('/', cards.getCards);
router.get('/:cardId', cards.getCard);
router.post('/', cards.createCard);
router.delete('/:cardId', cards.deleteCard);

export default router;
