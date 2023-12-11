import express from "express";

import authorized from "../middleware/jwt"
import userController from "../controller/userController";
import classMajorController from "../controller/classMajorController";
import classroomController from "../controller/classroomController";
import roleController from "../controller/roleController";
import studentController from "../controller/studentController";
import authController from "../controller/authController";

const userRouter = express.Router();


userRouter.post('/api/login', authController.login),

    userRouter.get('/api/user', userController.get);
userRouter.get('/api/user/:id', authorized.user, userController.getById);

// classroom route
userRouter.get('/api/classroom', classroomController.get);
userRouter.get('/api/classroom/:id', classroomController.getById);
userRouter.post('/api/classroom', classroomController.create);
userRouter.put('/api/classroom/:id', classroomController.update);
userRouter.delete('/api/classroom/:id', classroomController.deleted);

// class major route
userRouter.get('/api/class/major', classMajorController.get);
userRouter.get('/api/class/major/:id', classMajorController.getById);
userRouter.post('/api/class/major', classMajorController.create);

// role route
userRouter.get('/api/role', roleController.get)
userRouter.post('/api/role', roleController.create)

// student rout
userRouter.get('/api/student', studentController.get)
userRouter.post('/api/student', studentController.create)

export {
    userRouter
}
