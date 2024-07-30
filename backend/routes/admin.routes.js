import express from 'express';
// import { verifyAdmin } from '../middlewares/authMiddleware.js';
import AdminController from '../controllers/admin.controllers.js';

const router = express.Router();

router.post('/register', AdminController.register);
router.post('/login', AdminController.login);
// router.get('/profile', verifyAdmin, getAdminProfile);

export default router;
