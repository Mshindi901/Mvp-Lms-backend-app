import {newQuestion, getQuestionsByQuiz, updateQuestion, deleteQuestion} from '../../Controllers/Courses/question.controller.js';
import {authentucation} from '../../Middleware/authentication.js';
import {authorization} from '../../Middleware/authorization.js';
import express from 'express';

const router = express.Router();

router.post('/question/:quizId', authentucation, authorization(['instructor']), newQuestion);

router.get('/questions/:quizId', authentucation, authorization(['instructor', 'student']), getQuestionsByQuiz);

router.put('/question/:questionId', authentucation, authorization(['instructor']), updateQuestion);

router.delete('/question/:questionId', authentucation, authorization(['instructor']), deleteQuestion);

export default router;