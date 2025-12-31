import express from 'express';
import cors from 'cors';

//Routes would be imported here
import adminRoutes from './src/Routes/Admin-Routes/admin.routes.js'
import authRoutes from './src/Routes/Auth-Routes/auth.routes.js';
import courseRoutes from './src/Routes/Course-Routes/course.routes.js';
import quizAttemptRoutes from './src/Routes/Course-Routes/quizAttempt.routes.js';
import LessonRoutes from './src/Routes/Course-Routes/lesson.routes.js';
import LessonProgressRoutes from './src/Routes/Course-Routes/progress.routes.js';
import QuizRoutes from './src/Routes/Course-Routes/quiz.routes.js';
import QuestionRoutes from './src/Routes/Course-Routes/question.routes.js';
import NotesRoutes from  './src/Routes/Course-Routes/Notes.routes.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/admin', adminRoutes); 

app.use('/api/auth', authRoutes);

app.use('/api/courses', courseRoutes);

app.use('/api/lessons', LessonRoutes);

app.use('/api/lesson-progress', LessonProgressRoutes);

app.use('/api/notes', NotesRoutes);

app.use('/api/quizzes', QuizRoutes);

app.use('/api/questions', QuestionRoutes);

app.use('/api/quizattempt', quizAttemptRoutes);
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});