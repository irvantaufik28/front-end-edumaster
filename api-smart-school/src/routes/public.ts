import express from "express";

import authorized from "../middleware/jwt"
import userController from "../controller/userController";
import classMajorController from "../controller/classMajorController";
import classroomController from "../controller/classroomController";
import roleController from "../controller/roleController";
import studentController from "../controller/studentController";
import studentParentController from "../controller/studentParentController"
import authController from "../controller/authController";
import uploadMediaController from "../controller/uploadMediaController";
import {upload} from '../middleware/handle-upload'

const publicRouter = express.Router();


publicRouter.post('/api/v1/login', authController.login)
publicRouter.get('/api/v1/class/major-list', classMajorController.list);


export {
    publicRouter
}
