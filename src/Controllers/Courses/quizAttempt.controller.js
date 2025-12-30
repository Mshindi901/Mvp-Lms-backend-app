import * as  db from '../../../models/index.cjs';

const {quizAttempts, Questions} = db.default || db;

// Number One to store scores will have a function to check the number of answers in the JSON file check which ones are correct
//All of this is done on the frontend and the final score is sent to the backend to be stored
//so I had to get the passed value and scored from the frontend as well = req.body;
export const recordQuizAttempt = async (req, res) => {
    try {
        const student_id = req.user.id;
        const {questionId } = req.params;
        const {scored, passed, answers} = req.body;

        if(!questionId || !student_id || scored === undefined || passed === undefined || !answers){
            return res.status(401).json({
                success: false,
                message: 'Provide All Info'
            });
        };

        //getting the quiz id from the question id
        const question = await Questions.findByPk(questionId);
        if(!question){
            return res.status(400).json({
                success: false,
                
            });
        };
        const quiz_id = question.quiz_id;

        await quizAttempts.create({
            quiz_id,
            student_id,
            score: scored,
            passed,
            answers
        });


    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};