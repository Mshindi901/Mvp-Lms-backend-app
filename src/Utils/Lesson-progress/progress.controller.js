//This controller manages lesson progress for users
//it checks if a student has started or completed a lesson
//Enables updates to lesson progress
//and retrieves progress data for reporting purposes

import * as db from '../../../models/index.cjs';

const { LessonProgress } = db.default || db;

//Creatng a new lesson progress entry when a student starts a lesson
export const createLessonProgress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId, lessonId } = req.body;

        if (!courseId || !lessonId) {
            return res.status(400).json({ success: false, message: 'courseId and lessonId are required' });
        };
        //check if progress entry already exists
        const existingProgress = await LessonProgress.findOne({
            where: {
                student_id: userId,
                course_id: courseId,
                lesson_id: lessonId
            }
        });
        if (existingProgress) {
            return res.status(400).json({ success: false, message: 'Lesson progress already exists' });
        };
        res.status(201).json({ success: true, message: 'Lesson progress created successfully' });
    } catch (error) {
        console.error('Error creating lesson progress:', error);
        res.status(500).json({success:false, message: 'Internal server error' });
    }
};

//updating Lesson progress percentage or status
export const updateLessonProgress = async (req, res) => {
    try {
        const userId = req.user.id;
        const {progress} = req.body;
        const { lessonId, courseId } = req.params;
        if (progress === undefined || progress < 0 || progress > 100) {
            return res.status(400).json({ success: false, message: 'Progress must be between 0 and 100' });
        };

        //get Lesson progress record
        const lessonProgress = await LessonProgress.findOne({
            where: {
                student_id: userId,
                lesson_id: lessonId,
                course_id: courseId
            }
        });

        if (!lessonProgress) {
            return res.status(404).json({ success: false, message: 'Lesson progress not found' });
            await LessonProgress.create({
                //add a new record if not found
                student_id: userId,
                lesson_id: lessonId,
                course_id: courseId,
                status: 'in_progress',
                progress: 0
            });
        };
        //update progress
        lessonProgress.progress = progress || lessonProgress.progress
        
        if (progress === 100) {
            lessonProgress.status = 'completed'
        };
        await lessonProgress.save();
        res.status(200).json({ success: true, message: 'Lesson progress updated successfully' });
    } catch (error) {
        console.error('Error updating lesson progress:', error);
        res.status(500).json({success:false, message: 'Internal server error' });
    }
};

//Retrieving lesson progress for a specific student
export const getLessonProgress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { lessonId, courseId } = req.params;

        if (!lessonId || !courseId) {
            return res.status(400).json({ success: false, message: 'lessonId and courseId are required' });
        };

        const lessonProgress = await LessonProgress.findOne({
            where: {
                student_id: userId,
                lesson_id: lessonId,
                course_id: courseId
            }
        });
        if (!lessonProgress) {
            return res.status(404).json({ success: false, message: 'Lesson progress not found' });
            await LessonProgress.create({
                student_id: userId,
                course_id: courseId,
                lesson_id: lessonId,
                status: 'in_progress',
                progress: 0
            });
        };
        res.status(200).json({ success: true, data: lessonProgress });

    } catch (error) {
        console.error('Error retrieving lesson progress:', error);
        res.status(500).json({success:false, message: 'Internal server error' });
    }
};

//Retrieving all lesson progress for reporting purposes
export const getAllLessonProgress = async (req, res) => {
    try {
        const lessonProgresses = await LessonProgress.findAll();
        if (!lessonProgresses || lessonProgresses.length === 0) {
            return res.status(404).json({ success: false, message: 'No lesson progress records found' });
        };
        res.status(200).json({ success: true, data: lessonProgresses });
    } catch (error) {
        console.error('Error retrieving all lesson progress:', error);
        res.status(500).json({success:false, message: 'Internal server error' });
    }
};