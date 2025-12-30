import {adminLogin, userRoleChange, deleteUser, viewAllUsers, viewAllLessons, viewAllQuizzes, viewQuestions} from '../../Controllers/Admin/admin.controller.js';
import {adminAuthentication} from '../../Middleware/admin-authentication.js';
import {authorization} from '../../Middleware/authorization.js';

import express from 'express';
const router = express.Router();

router.post('/login', adminLogin);

router.put('/user/:userId/userRole', adminAuthentication, authorization(['admin']), userRoleChange);

router.delete('/user/:userId', adminAuthentication, authorization(['admin']), deleteUser);

router.get('/users', adminAuthentication, authorization(['admin']), viewAllUsers);

router.get('/lessons', adminAuthentication, authorization(['admin']), viewAllLessons);

router.get('/quizzes', adminAuthentication, authorization(['admin']), viewAllQuizzes);

router.get('/questions/:quizId', adminAuthentication, authorization(['admin']), viewQuestions);

export default router;