import {newCourse, getAllCourses, getACourse, updateCourse, deleteCourse} from '../../Controllers/Courses/course.controller.js';
import {authentucation} from '../../Middleware/authentication.js';
import {authorization} from '../../Middleware/authorization.js';
import express from 'express';

const router = express.Router();

router.post('/course', authentucation, authorization(['instructor']), newCourse);

router.get('/courses', authentucation, authorization(['instructor']), getAllCourses);

router.get('/course/:id', authentucation, authorization(['instructor']), getACourse);

router.put('/course/:id', authentucation, authorization(['instructor']), updateCourse);

router.delete('/courses/:id', authentucation, authorization(['instructor']), deleteCourse);

export default router;