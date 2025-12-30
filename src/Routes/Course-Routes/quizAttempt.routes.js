import e from 'express';
import {recordQuizAttempt} from '../../Controllers/Courses/quizAttempt.controller.js';
import {authentucation} from '../../Middleware/authentication.js'
import express from 'express';


const router = express.Router();

router.post('/quizattempt/:questionId',authentucation,recordQuizAttempt);

export default router;