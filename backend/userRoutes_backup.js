import express from 'express';
import { getProfile, updateProfile, updateProfileImage } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get user profile
router.get('/profile', protect, getProfile);

// Update user profile
router.put('/profile', protect, updateProfile);

// Upload profile image
router.post('/profile-image', protect, updateProfileImage);

export default router;
