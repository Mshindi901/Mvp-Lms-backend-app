import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const adminToken = process.env.JWT_ADMIN_TOKEN;

export const adminAuthentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    };
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, adminToken);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
        };

        req.admin = decoded;
        next();

    } catch (error) {
        console.error('Admin authentication error:', error);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};