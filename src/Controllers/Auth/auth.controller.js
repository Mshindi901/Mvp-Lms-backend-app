import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import * as db from '../../../models/index.cjs'
dotenv.config();
const {User} = db.default || db;
export const NewUser = async(req, res) => {
    try {
        const {name, email, password, role } = req.body;
        if(!name || !email || !password || !role){
            return res.status(401).json({
                success: false,
                message: 'Send All Credentials'
            });
        };

        const isUser = await User.findOne({where: {email: email}});
        if(isUser){
            return res.status(401).json({
                success: false,
                message: 'Email already exists'
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        return res.status(201).json({
            success: true,
            message: 'User Created Successfully'
        })
        
    } catch (error) {
        console.error('Error Creating new user:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export const UserLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: 'Provide All Credentials'
            });
        };
        const isUser = await User.findOne({where: {email: email}});
        if(!isUser){
            return res.status(401).json({
                success: false,
                message: 'User email not found'
            });
        }
        const isPasswordvalid = await bcrypt.compare(password, isUser.password);
        if(!isPasswordvalid){
            return res.status(401).json({
                success: false,
                message: 'Password Incorrect'
            });
        };
        const token = jwt.sign({id: isUser.id}, process.env.JWT_TOKEN, {expiresIn: '1h'})
        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Token was not signed'
            });
        };
        return res.status(200).json({
            success: true,
            message: 'Logged in Successfully',
        });
    } catch (error) {
        console.error('Error Logging in user:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export const DeleteUser = async (req, res) => {
    try {
        const userId = req.user.id
        if(!userId){
            return res.status(401).json({
                success: false,
                message: 'No User Id'
            });
        };
        const isUser = await User.findByPk(userId)
        if(!isUser){
            return res.status(400).json({
                success: false,
                message: 'User Not found'
            });
        };
        await isUser.destroy();
        return res.status(200).json({success: true, message: 'Account deleted'})
    } catch (error) {
        console.error('Error deleting user:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
