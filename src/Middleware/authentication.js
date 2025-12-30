//authentucation middleware code
//WEE UNAONA NI NINI🤣
import jwt from 'jsonwebtoken';

export const authentucation = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'No Token Provided'
            });
        };
        //verify token logic here
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(decoded.role ==! 'student' || 'instructor'){
            return res.status(403).json({
                success: false,
                message: 'Access Denied, Admins are not allowed'
            });
        };
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(401).json({
            success: false,
            message: 'Authentication Failed'
        })
    }
};