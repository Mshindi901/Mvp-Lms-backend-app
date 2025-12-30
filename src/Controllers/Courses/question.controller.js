import * as db from '../../../models/index.cjs';

const {Questions} = db.default || db;;

export const newQuestion = async (req, res) => {
    try {
        const {questionText, options, correctAnswer, marks} = req.body;
        const {quizId} = req.params;

        if(!questionText || !options || !correctAnswer || !quizId || !marks){
            return res.status(401).json({
                success: false,
                message: 'Provide All Info'
            });
        };
        await Questions.create({
            questionText,
            options,
            correctAnswer,
            quiz_id: quizId,
            marks
        });
        return res.status(201).json({
            success: true,
            message: 'Question Created Successfully'
        });
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export const getQuestionsByQuiz = async (req, res) => {
    try {
        const {quizId} = req.params;
        if(!quizId){
            return res.status(401).json({
                success: false,
                message: 'Provide Quiz Id'
            });
        };
        const quizQuestions = await Questions.findAll({where: {
            quiz_id: quizId
        }});
        if(!quizQuestions || quizQuestions.length === 0){
            return res.status(400).json({
                success: false,
                message: 'Problem Fetching Questions'
            });
        };
        return res.status(200).json({
            success: true,
            message: 'Questions retrieved',
            Questions: quizQuestions
        });
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export const updateQuestion = async (req, res) => {
    try {
        const {questionId} = req.params;
        const {questionText, options, correctAnswer} = req.body;
        if(!questionId || !questionText || !options || !correctAnswer){
            return res.status(401).json({
                success: false,
                message: 'Provide All Info'
            });
        };

        const questionToUpdate = await Questions.findOne({where: {
            id: questionId
        }});

        if(!questionToUpdate){
            return res.status(404).json({
                success: false,
                message: 'Question Not Found'
            });
        };
        questionToUpdate.questionText = questionText || questionToUpdate.questionText;
        questionToUpdate.options = options || questionToUpdate.options;
        questionToUpdate.correctAnswer = correctAnswer|| questionToUpdate.correctAnswer;

        await questionToUpdate.save();
        return res.status(200).json({
            success: true,
            message: 'Question Updated Successfully'
        });
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const {questionId} = req.params;
        if(!questionId){
            return res.status(401).json({
                success: false,
                message: 'Provide Question Id'
            });
        };

        const questionToDelete = await Questions.findOne({where: {
            id: questionId
        }});

        if(!questionToDelete){
            return res.status(404).json({
                success: false,
                message: 'Question Not Found'
            });
        };

        await questionToDelete.destroy();

        return res.status(200).json({
            success: true,
            message: 'Question Deleted Successfully'
        });
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
};

