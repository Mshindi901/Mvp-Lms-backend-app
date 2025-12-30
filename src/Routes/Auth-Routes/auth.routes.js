import {NewUser, UserLogin, DeleteUser} from '../../Controllers/Auth/auth.controller.js';
import {authentucation} from '../../Middleware/authentication.js';
import express from 'express';

const router = express.Router();

router.post('/register', NewUser);

router.post('/login', UserLogin);

router.delete('/delete', authentucation,  DeleteUser);

export default router;

