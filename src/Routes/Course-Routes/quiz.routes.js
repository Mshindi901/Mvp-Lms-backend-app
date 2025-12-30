import {newQuiz, getQuizByLesson, submitQuiz, updateQuiz} from '../../Controllers/Courses/quiz.controller.js';
import {authentucation} from '../../Middleware/authentication.js'
import {authorization} from '../../Middleware/authorization.js'
import express from 'express';
const router = express.Router();

router.post('/quiz/:lessonId', authentucation, authorization(['instructor']), newQuiz);

router.get('/quiz/:lessonId', authentucation, authorization(['instructor', 'student']), getQuizByLesson);

router.post('/quiz/submit/:quizId', authentucation, authorization(['student']), submitQuiz);

router.put('/quiz/:quizId', authentucation, authorization(['instructor']), updateQuiz);

export default router;