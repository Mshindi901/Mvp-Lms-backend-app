import * as db from '../../../models/index.cjs';
import dotenv from 'dotenv';
dotenv.config();
import {ID} from 'node-appwrite';
import {storage} from '../../Middleware/app-write.js';

const {Notes} = db.default || db;

export const uploadNotes = async (req, res) => {
    try {
        const {title, lessonId} = req.body;
        const file = req.file;
        if(!file || !lessonId) {
            return  res.status(400).json({success:false, message: 'Missing required fields' });
        };

        //upload file to bucket
        const bucketId = process.env.APPWRITE_BUCKET_ID;

        const uploadingFile = await storage.createFile(
            bucketId,
            ID.unique(),
            file.buffer // file from multer
        );

        await Notes.create({
            title,
            lessonId,
            file_id: uploadingFile.$id,
            bucket_id: bucketId,
        });
        res.status(201).json({success:true, message: 'Notes uploaded successfully' });
    } catch (error) {
        console.error('Error uploading notes:', error);
        res.status(500).json({success:false, message: 'Internal server error' });
    }
};

export const getNotesByLesson = async (req, res) => {
    try {
        const {lessonId} = req.params;
        if(!lessonId) {
            return  res.status(400).json({success:false, message: 'Missing lessonId parameter' });
        };
        const notes = await Notes.findAll({where: {lesson_id: lessonId}});
        if(notes.length === 0) {
            return res.status(404).json({success:false, message: 'No notes found for this lesson' });
        };
        res.status(200).json({success:true, message: 'Notes retrieved', data: notes }); 
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({success:false, message: 'Internal server error' });
    }
};

export const viewNotes = async (req, res) => {
    try {
        const {noteId} = req.params;
        if(!noteId) {
            return  res.status(400).json({success:false, message: 'Missing noteId parameter' });
        };

        const note = await Notes.findByPk(noteId);
        if(!note) {
            return res.status(404).json({success:false, message: 'Note not found' });
        };
        const downloadUrl = await storage.getFileDownload(note.bucket_id, note.file_id);  

        res.status(200).json({success:true, message: 'Note retrieved', data: downloadUrl });
    } catch (error) {
        console.error('Error viewing notes:', error);
        res.status(500).json({success:false, message: 'Internal server error' });
    }
};

export const deleteNotes = async (req, res) => {
    try {
        const {noteId} = req.params;
        if(!noteId) {
            return  res.status(400).json({success:false, message: 'Missing noteId parameter' });
        };

        const note = await Notes.findByPk(noteId);
        if(!note) {
            return res.status(404).json({success:false, message: 'Note not found' });
        };
        //delete file from bucket
        await storage.deleteFile(note.bucket_id, note.file_id);
        await note.destroy();

        res.status(200).json({success:true, message: 'Note deleted successfully' }); 
    } catch (error) {
        console.error('Error deleting notes:', error);
        res.status(500).json({success:false, message: 'Internal server error' });
    }
};