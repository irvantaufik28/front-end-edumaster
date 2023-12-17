import express from "express";

import authorized from "../middleware/jwt"
import userController from "../controller/userController";
import classMajorController from "../controller/classMajorController";
import classroomController from "../controller/classroomController";
import roleController from "../controller/roleController";
import studentController from "../controller/studentController";
import authController from "../controller/authController";
import uploadMediaController from "../controller/uploadMediaController";
import {upload} from '../middleware/handle-upload'

const userRouter = express.Router();


userRouter.post('/api/v1/login', authController.login),

userRouter.get('/api/v1/user', userController.get);
userRouter.get('/api/v1/user/:id', authorized.user, userController.getById);

// classroom route
userRouter.get('/api/v1/classroom', classroomController.get);
userRouter.get('/api/v1/classroom/:id', classroomController.getById);
userRouter.post('/api/v1/classroom', classroomController.create);
userRouter.put('/api/v1/classroom/:id', classroomController.update);
userRouter.delete('/api/v1/classroom/:id', classroomController.deleted);

// class major route
userRouter.get('/api/v1/class/major', classMajorController.get);
userRouter.get('/api/v1/class/major/:id', classMajorController.getById);
userRouter.post('/api/v1/class/major', classMajorController.create);

// role route
userRouter.get('/api/v1/role', roleController.get)
userRouter.post('/api/v1/role', roleController.create)

// student route
userRouter.get('/api/v1/student', studentController.get)
userRouter.get('/api/v1/student/:id', studentController.getById)
userRouter.post('/api/v1/student', studentController.create)
userRouter.put('/api/v1/student/:id', studentController.update)

//media upload
userRouter.post('/api/v1/upload', upload.single('file'),uploadMediaController.upload)

export {
    userRouter
}
