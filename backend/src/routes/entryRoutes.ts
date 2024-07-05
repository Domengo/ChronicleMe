import express from 'express';
import { getEntries, addEntry, editEntry, removeEntry } from '../controllers/entryController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getEntries);
router.post('/', authenticateToken, addEntry);
router.put('/:id', authenticateToken, editEntry);
router.delete('/:id', authenticateToken, removeEntry);

export default router;
