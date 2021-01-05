import express from 'express';
import { googleLogin } from '../controllers/auth'; // Import auth controller

const router = express.Router();

router.post('/googleLogin', googleLogin);

export default router;