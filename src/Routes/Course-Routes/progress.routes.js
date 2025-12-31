import e from 'express';
import {createLessonProgress, updateLessonProgress, getLessonProgress, getAllLessonProgress} from '../../../src/Utils/Lesson-progress/progress.controller.js';
import {authentucation} from  '../../Middleware/authentication.js';
import {authorization} from '../../Middleware/authorization.js';
import express from 'express';


const router = express.Router();

//Route to create lesson progress
router.post('/lesson-progress',authentucation, authorization(['student']), createLessonProgress);

//Route to update lesson progress
router.put('/lesson-progress',authentucation, authorization(['student']), updateLessonProgress);

//Route to get lesson progress for a specific student
router.get('/lesson-progress/:courseId/:lessonId',authentucation,  getLessonProgress);

//Route to get all lesson progress for a specific student
router.get('/lesson-progress',authentucation, authorization(['admin']), getAllLessonProgress);

export default router;

