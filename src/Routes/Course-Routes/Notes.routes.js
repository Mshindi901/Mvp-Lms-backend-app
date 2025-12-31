import {uploadNotes, getNotesByLesson, viewNotes, deleteNotes} from '../../Controllers/Courses/Notes.controller.js';
import express from 'express';
import {upload} from '../../Middleware/multer.js';
import {authentucation} from '../../Middleware/authentication.js'
import {authorization} from '../../Middleware/authorization.js';

const router = express.Router();

// Upload notes
router.post('/notes', authentucation, authorization(['instructor']), upload.single('file'), uploadNotes);

// Get notes by lesson ID
router.get('/notes/:lessonId', authentucation, getNotesByLesson);

// View notes
router.get('/notes/view/:noteId', authentucation, viewNotes);

// Delete notes
router.delete('/notes/:noteId', authentucation, authorization(['instructor']), deleteNotes);

export default router;