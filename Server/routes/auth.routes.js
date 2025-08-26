import express from 'express'
import { upload } from '../middleware/multer.middleware.js';
import { registerUser } from '../controllers/auth.controllers.js';


const router = express.Router();


router.post('/register',upload.single('avatar'),registerUser);


export default router;