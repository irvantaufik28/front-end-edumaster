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

const router = express.Router();

router.post('/login', authController.login)
router.get('/class/major-list', classMajorController.list);

router.get('/user', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), userController.get);
router.get('/user/:id', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), userController.getById);

// classroom route
router.get('/classroom', classroomController.get);
router.get('/classroom/:id', classroomController.getById);
router.post('/classroom',authorized.allowedRoles(["administrator", "manager", "staff_tu"]) ,classroomController.create);
router.put('/classroom/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController.update);
router.delete('/classroom/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController.deleted);
router.post('/classroom/move-student/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController.moveStudent);
router.delete('/classroom/delete/student',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController.deleteStudent);

// class major route
router.get('/class/major', classMajorController.get);
router.get('/class/major/:id', classMajorController.getById);
router.post('/class/major', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController.create);
router.put('/class/major/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController.update);
router.delete('/class/major/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController.deleted);

// role route
router.get('/role', roleController.get)
router.post('/role',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), roleController.create)
router.post('/user-role',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), roleController.createUserRole)
router.delete('/user-role',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), roleController.deleteUserRole)

// student route
router.get('/student', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentController.get)
router.get('/student/:id', studentController.getById)
router.post('/student',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentController.create)
router.put('/student/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentController.update)

// student Parent Route
router.get('/student-parent', studentParentController.get)
router.get('/student-parent/:id', studentParentController.getById)
router.post('/student-parent',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController.create)
router.put('/student-parent/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController.update)
router.delete('/student-parent/:id',authorized.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController.deleted)

// staff route
router.get('/staff', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), staffController.get)
router.get('/staff/:id', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), staffController.getById)
router.post('/staff', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), staffController.create)
router.put('/staff/:id', authorized.allowedRoles(["administrator", "manager", "staff_tu"]), staffController.update)


//media upload
router.post('/upload', upload.single('file'),authorized.allowedRoles(["administrator", "manager", "staff_tu"]), uploadMediaController.upload)

export default router;