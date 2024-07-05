import express from 'express';
import { updateProfile } from '../controllers/profileController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.put('/update-profile', authenticateToken, updateProfile);

export default router;
