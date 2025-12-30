import * as db from '../../../models/index.cjs';

const {quizzes} = db.default || db;

export const newQuiz = async (req, res) => {
    try {
        const {title, totalScores, passMark} = req.body;
        const {lessonId} = req.params;

        if(!title || !totalScores || !lessonId || !passMark){
            return res.status(401).json({
                success: false,
                message: 'Provide All Info'
            });
        };

        const newQuiz = await quizzes.create({
            title,
            totalScores,
            lessonId,
            passMark
        });

        return res.status(201).json({
            success: true,
            message: 'Quiz Created Successfully'
        });
    } catch (error) {
        console.error('Error :', error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    };
};

export const getQuizByLesson = async (req, res) => {
    try {
        const {lessonId} = req.params;
        if(!lessonId){
            return res.status(401).json({
                success: false,
                message: 'Provide Lesson Id'
            });
        };

        const LessonQuizzes = await quizzes.findAll({where: {
            lesson_id: lessonId
        }});
        if(!LessonQuizzes || !LessonQuizzes.length === 0){
            return res.status(400).json({
                success: false,
                message: 'Problem Fetching Quizzes'
            });
        };

        return res.status(200).json({
            success: true,
            message: 'Lessons retrieved',
            Quizzes: LessonQuizzes
        });
    } catch (error) {
        console.error('Error :', error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export const submitQuiz = async (req, res) => {
    try {
        const {resultScores} = req.body;
        const {quizId} = req.params;
        if(!resultScores || !quizId){
            return res.status(401).json({
                success: false,
                message: 'Provide Both the Score result and the Quiz id'
            });
        };

        const isQuiz = await quizzes.findByPk(quizId);
        if(!isQuiz){
            return res.status(400).json({
                success: false,
                message: 'No Quiz found with such ID'
            });
        };

        isQuiz.resultScores = resultScores || isQuiz.resultScores;

        await isQuiz.save();

        return res.status(200).json({
            success: true,
            message: 'Quiz submtted'
        });
    } catch (error) {
        console.error('Error :', error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export const updateQuiz = async (req, res) => {
    try {
        const {title, totalScores} = req.body;
        const {quizId} = req.params;

        if(!title || !totalScores || !quizId){
            return res.status(401).json({
                success: false,
                message: 'Provide All Info'
            });
        };

        const selectedQuiz = await quizzes.findByPk(quizId);
        if(!selectedQuiz){
            return res.status(400).json({
                success: false,
                message: 'No Quiz found by this Id'
            });
        };

        selectedQuiz.title = title || selectedQuiz.title
        selectedQuiz.totalScores = totalScores || selectedQuiz.totalScores

        await selectedQuiz.save();

        return res.status(200).json({
            success: true,
            message: 'Quiz Updated'
        })
    } catch (error) {
        console.error('Error :', error.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};