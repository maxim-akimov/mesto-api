import { Router } from 'express';
import users from '../controllers/users';

const router = Router();

router.get('/', users.getUsers);
router.get('/:userId', users.getUser);
router.post('/', users.createUser);

export default router;
