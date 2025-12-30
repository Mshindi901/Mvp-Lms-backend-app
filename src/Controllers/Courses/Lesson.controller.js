import {storage} from '../../Middleware/app-write.js';
import {ID} from 'node-appwrite'
import * as db from '../../../models/index.cjs';
import dotenv from 'dotenv';
dotenv.config();

const {Lessons, User} = db.default || db;

//upload a new Lesson
export const NewLesson = async (req, res) => {
    try {
        const userId = req.user.id;
        const {courseId} = req.params;
        const {title, contentType, description} = req.body;

        if(!userId || !courseId || !title || !contentType || !description){
            return res.status(401).json({
                success: false,
                message: 'Provide All credentials'
            });
        };

        const isUser = await User.findByPk(userId);
        if(!isUser){
            return res.status(400).json({
                success: false,
                message: 'No User Found, please Login'
            });
        };

        const bucketId = process.env.APPWRITE_BUCKET_ID;

        //uploading Lesson content to storage
        const file = await storage.createFile(
            bucketId,
            ID.unique(),
            req.file.buffer // file from multer
        );

        const newLesson = await Lessons.create({
            title,
            contentType,
            course_id: courseId,
            file_id: file.$id,
            bucket_id: bucketId
        });
        return res.status(201).json({
            success: true,
            message: 'New Lesson created'
        });
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
};

//get all Course Lessons
export const allCourseLessons = async (req, res) => {
    try {
        const { courseId } = req.params;
        if(!courseId){
            return res.status(401).json({
                success: false,
                message: 'No Course id'
            }); 
        };

        const allLessons = await Lessons.findAll({where: {
            course_id: courseId
        }});
        if(!allLessons || allLessons.length === 0){
            return res.status(400).json({
                success: false,
                message: 'No Lessons Found'
            });
        };
        return res.status(200).json({
            success: true,
            message: 'Lessons Found',
            lessons: allLessons
        });
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//get Lessson
export const aLesson = async (req, res) => {
    try {
        const {courseId, LessonId} = req.params
        if(!courseId || !LessonId){
            return res.status(401).json({
                success: false,
                message: 'Provide All Ids'
            });
        };

        const lesson = await Lessons.findOne({where: {
            id: LessonId,
            course_id: courseId
        }});
        if(!lesson){
            return res.status(400).json({
                success: false,
                message: 'No Lesson Found'
            })
        };

        const bucketId = process.env.APPWRITE_BUCKET_ID;

        const result = storage.getFileView(bucketId, lesson.file_id);

        if(!result){
            return res.status(400).json({
                success: false,
                message: 'Error getting file Url/content url'
            });
        };

        return res.status(200).json({
            success: true,
            message: 'Lesson retrieved',
            contentUrl: result.href,
            lessonTitle: lesson.title,
            description: lesson.description,
            lesson: lesson.contentType
        })
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//update Lesson remember when updating to delete the former media file from the storage
export const updateLesson = async (req, res) => {
    try {
        const {courseId, lessonId} = req.params;
        const {title, description, contentType} = req.body;
        if(!courseId || !lessonId || !title || !description || !contentType){
            return res.status(401).json({
                success: false,
                message: 'Provide all Info'
            });
        };

        const Lesson = await Lessons.findOne({where: {
            id: lessonId,
            course_id: courseId
        }});
        if(!Lesson){
            return res.status(400).json({
                success: false,
                message: 'No Lesson Found'
            });
        };
        const bucketId = process.env.APPWRITE_BUCKET_ID;

        if(req.file){
            if(Lesson.file_id){
                try {
                   await storage.deleteFile(bucketId, Lesson.file_id); 
                } catch (error) {
                    return console.error('Failed to delete Old File:', error.message);
                };
            };
        };

        const file = await storage.createFile(
            bucketId, 
            ID.unique(),
            req.file.buffer
        );

        Lesson.file_id = file.$id
        Lesson.title = title || Lesson.title;
        Lesson.contentType = contentType || Lesson.contentType;
        Lesson.description = description || Lesson.description

        await Lesson.save();
        return res.status(200).json({
            success: true,
            message: 'Lesson Updated',
        })

    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//delete Lesson
export const deleteLesson = async (req, res) => {
    try {
        const {lessonId} = req.params;
        if(!lessonId){
            return res.status(401).json({
                success: false,
                message: 'Provide Lesson Id'
            });
        };

        const Lesson = await Lessons.findByPk(lessonId);
        if(!Lesson){
            return res.status(400).json({
                success: false,
                message: 'No Lesson Found',
            });
        };
        await Lesson.destroy();
        return res.status(200).json({
            success: true,
            message: 'Deleted Successfully'
        })
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};