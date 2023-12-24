import express from "express";

import authorized from "../middleware/jwt"
import userController from "../controller/userController";
import classMajorController from "../controller/classMajorController";
import classroomController from "../controller/classroomController";
import roleController from "../controller/roleController";
import studentController from "../controller/studentController";
import studentParentController from "../controller/studentParentController"
import staffController from "../controller/staffController"
import uploadMediaController from "../controller/uploadMediaController";
import {upload} from '../middleware/handle-upload'
import authController from "../controller/authController";

const userRouter = express.Router();

userRouter.post('/api/v1/login', authController.login)
userRouter.get('/api/v1/class/major-list', classMajorController.list);

userRouter.get('/api/v1/user', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), userController.get);
userRouter.get('/api/v1/user/:id', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), userController.getById);

// classroom route
userRouter.get('/api/v1/classroom', classroomController.get);
userRouter.get('/api/v1/classroom/:id', classroomController.getById);
userRouter.post('/api/v1/classroom',authorized.allowedRoles(["administrator", "manager", "staff_tu"]) ,classroomController.create);
userRouter.put('/api/v1/classroom/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController.update);
userRouter.delete('/api/v1/classroom/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController.deleted);
userRouter.post('/api/v1/classroom/move-student/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController.moveStudent);
userRouter.delete('/api/v1/classroom/delete/student',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController.deleteStudent);

// class major route
userRouter.get('/api/v1/class/major', classMajorController.get);
userRouter.get('/api/v1/class/major/:id', classMajorController.getById);
userRouter.post('/api/v1/class/major', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController.create);
userRouter.put('/api/v1/class/major/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController.update);
userRouter.delete('/api/v1/class/major/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController.deleted);

// role route
userRouter.get('/api/v1/role', roleController.get)
userRouter.post('/api/v1/role',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), roleController.create)
userRouter.post('/api/v1/user-role',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), roleController.createUserRole)
userRouter.delete('/api/v1/user-role',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), roleController.deleteUserRole)

// student route
userRouter.get('/api/v1/student', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentController.get)
userRouter.get('/api/v1/student/:id', studentController.getById)
userRouter.post('/api/v1/student',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentController.create)
userRouter.put('/api/v1/student/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentController.update)

// student Parent Route
userRouter.get('/api/v1/student-parent', studentParentController.get)
userRouter.get('/api/v1/student-parent/:id', studentParentController.getById)
userRouter.post('/api/v1/student-parent',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController.create)
userRouter.put('/api/v1/student-parent/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController.update)
userRouter.delete('/api/v1/student-parent/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController.deleted)

// staff route
userRouter.get('/api/v1/staff', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), staffController.get)
userRouter.get('/api/v1/staff/:id', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), staffController.getById)
userRouter.post('/api/v1/staff', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), staffController.create)
userRouter.put('/api/v1/staff/:id', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), staffController.update)


//media upload
userRouter.post('/api/v1/upload', upload.single('file'),authorized.allowedRoles(["administrator", "manager", "staff_tu"]), uploadMediaController.upload)

export {
    userRouter
}
