import {NewLesson, allCourseLessons, aLesson, updateLesson, deleteLesson} from '../../Controllers/Courses/Lesson.controller.js';
import {authentucation} from '../../Middleware/authentication.js';
import {authorization} from '../../Middleware/authorization.js';
import {upload} from '../../Middleware/multer.js'
import express from 'express';

const router = express.Router();

router.post('/lesson/:courseId', authentucation, authorization(['instructor']), upload.single('video'), NewLesson);

router.get('/lessons/:courseId/:lessonId', authentucation, authorization(['instructor', 'student']), allCourseLessons);

router.get('/lesson/:id', authentucation, authorization(['instructor', 'student']), aLesson);

router.put('/lesson/:lessonId/:courseId', authentucation, authorization(['instructor']), upload.single('video'), updateLesson);

router.delete('/lesson/:id', authentucation, authorization(['instructor']), deleteLesson);

export default router;