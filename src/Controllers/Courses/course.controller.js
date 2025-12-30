import * as db from '../../../models/index.cjs'
const {User, Course} = db.default || db;

//create a new course
export const newCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(401).json({
                success: false,
                message: 'No user id provided, please Login'
            });
        };
        const {title, description} = req.body;
        if(!title || !description){
            return res.status(401).json({
                success: false,
                message: 'Provide All the Info'
            });
        };

        const isUser = await User.findByPk(userId);
        if(!isUser){
            return res.status(400).json({
                success: false,
                message: 'No user Found, please Login'
            });
        };
        const newCourse = await Course.create({
            title,
            description,
            instructor_id: isUser.id
        });
        return res.status(201).json({
            success: true,
            message: 'Course Created'
        })
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//get instructors courses
export const getAllCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(401).json({
                success: false,
                message: 'No Id Provided, please Login'
            });
        };

        const isUser = await User.findByPk(userId);
        if(!isUser){
            return res.status(400).json({
                success: false,
                message: 'No user found, please login'
            });
        };

        const allUsersCourses = await Course.findAll({where: {
            instructor_id: isUser.id
        }});
        if(!allUsersCourses || allUsersCourses.length === 0){
            return res.status(401).json({
                success: false,
                message: 'No Courses found'
            });
        };
        return res.status(200).json({
            success: true,
            message: 'Courses Found',
            Courses: allUsersCourses
        });
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export const getACourse = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(401).json({
                success: false,
                message: 'No Id Provided, please Login'
            });
        };

        const { courseId } = req.params;
        if(!courseId){
            return res.status(401).json({
                success: false,
                message: 'No Course Id provided'
            });
        };

        const isUser = await User.findByPk(userId);
        if(!isUser){
            return res.status(400).json({
                success: false,
                message: 'No user found, please login'
            });
        };

        const userCourse = await Course.findOne({where: {
            instructor_id: isUser.id,
            id: courseId
        }});
        if(!userCourse){
            return res.status(400).json({
                success: false,
                message: 'No Course Found, please Login'
            });
        };
        return res.status(200).json({
            success: true,
            message: 'Course Found',
            Course: userCourse
        });
    } catch (error) {
        console.error('Error :', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//update a course
export const updateCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(401).json({
                success: false,
                message: 'No Id Provided, please Login'
            });
        };

        const { courseId } = req.params;
        const {title, description} = req.body
        if(!courseId || !title || !description){
            return res.status(401).json({
                success: false,
                message: 'No Course Id provided or Provide All info'
            });
        };

        const isUser = await User.findByPk(userId);
        if(!isUser){
            return res.status(400).json({
                success: false,
                message: 'No user found, please login'
            });
        };
        const userCourse = await Course.findOne({where: {
            instructor_id: isUser.id,
            id: courseId
        }});
        if(!userCourse){
            return res.status(401).json({
                success: false,
                message: 'NO Course found'
            });
        };
        
        userCourse.title = title;
        userCourse.description = description;
        await userCourse.save();
        return res.status(200).json({
            success: true,
            message: 'Course info updated'
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

//delete a course
export const deleteCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(401).json({
                success: false,
                message: 'No Id Provided, please Login'
            });
        };

        const { courseId } = req.params;
        const {title, description} = req.body
        if(!courseId || !title || !description){
            return res.status(401).json({
                success: false,
                message: 'No Course Id provided or Provide All info'
            });
        };

        const isUser = await User.findByPk(userId);
        if(!isUser){
            return res.status(400).json({
                success: false,
                message: 'No user found, please login'
            });
        };
        const userCourse = await Course.findOne({where: {
            instructor_id: isUser.id,
            id: courseId
        }});
        if(!userCourse){
            return res.status(401).json({
                success: false,
                message: 'NO Course found'
            });
        };
        await userCourse.destroy();
        return res.status(200).json({
            success: true,
            message: 'Course deleted'
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};