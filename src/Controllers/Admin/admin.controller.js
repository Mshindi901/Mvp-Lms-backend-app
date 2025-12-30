import * as db from '../../../models/index.cjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const {User, Lesson, Question, Quiz}  = db.default || db;

dotenv.config();



//but before all that the admin must be authenticated and authorized to perform these operations.

export const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        };
        //check if the adimn email is true
        const admin = await User.findOne({where: {email, role: 'admin'}});
        if(!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or not an admin'
            });
        };
        //check if the password is correct
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        };
        const adminToken = process.env.JWT_ADMIN_TOKEN;
        const token = jwt.sign({ id: admin.id, role: admin.role }, adminToken, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: 'Admin logged in successfully',
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
//The admin can do the following operations; change user roles, delete users, view all students and instructors, view all lessons, view all quizzes and view all questions.
//all this routes must be protected using the adminAuthentication middleware and authorization middleware .
export const userRoleChange = async (req, res) => {
    try {
        const {newRole} = req.body;
        const {userId} = req.params;
        if(!userId || !newRole) {
            return res.status(400).json({
                success: false,
                message: 'User ID and new role are required'
            });
        };
        const user = await User.findByPk(userId);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        };
        user.role = newRole;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User role updated successfully',
        });
    } catch (error) {
        console.error('Error changing user role:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        };
        const user = await Users.findByPk(userId);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        };
        await user.destroy();
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const viewAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json({
            success: true,
            message: 'All users retrieved successfully',
            data: users
        })
    } catch (error) {
        console.error('Error viewing all users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const viewAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.findAll();
        res.status(200).json({
            success: true,
            message: 'All lessons retrieved successfully',
            data: lessons
        });
    } catch (error) {
        console.error('Error viewing all lessons:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const viewQuestions = async (req, res) => {
    try {
        const {quizId} = req.params;
        if(!quizId) {
            return res.status(400).json({
                success: false,
                message: 'Quiz ID is required'
            })
        };
        const questions = await Question.findAll({
            where: {
                quiz_id: quizId
            }
        });
        if(questions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No questions found for this quiz'
            });
        };
        res.status(200).json({
            success: true,
            message: 'All questions retrieved successfully',
            data: questions
        });
    } catch (error) {
        console.error('Error viewing all questions:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const viewAllQuizzes = async (req, res) => {
    try {
        const {lessonId} = req.params;
        if(!lessonId) {
            return res.status(400).json({
                success: false,
                message: 'Lesson ID is required'
            });
        };
        const quizzes = await Quiz.findAll({
            where: {
                lesson_id: lessonId
            }
        });
        if(quizzes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No quizzes found for this lesson'
            });
        };
        res.status(200).json({
            success: true,
            message: 'All quizzes retrieved successfully',
            data: quizzes
        });
    } catch (error) {
        console.error('Error viewing all quizzes:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};