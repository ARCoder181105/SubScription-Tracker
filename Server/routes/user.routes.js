import express from 'express'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { getUserSubscriptions } from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/home',authenticateJWT,getUserSubscriptions);


export default router;