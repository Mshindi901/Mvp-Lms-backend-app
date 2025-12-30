//authorization middleware code

export const authorization = (roles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role; // this means every route must be authenticated first
            if(!roles.includes(userRole)){
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: You do not have access to this resource'
                });
            };
            next();
        } catch (error) {
            console.error('Error :', error.message);
        };
    };
};