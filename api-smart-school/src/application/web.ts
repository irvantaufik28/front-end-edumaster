import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { userRouter } from "../routes/api";
import cors from "cors"

import UserRepository from "../repository/userRepository";
import ClassroomService from "../service/classroomService";
import ClassMajorService from "../service/classMajorService";
import StudentService from "../service/studentService";
import StaffService from "../service/staffService";

const classroomUC = new ClassroomService(new UserRepository())
const classMajorUC = new ClassMajorService()
const studentUC = new StudentService()
const staffUC = new StaffService()

export const web = express();


web.use(express.json());
web.use((req: any, res: any, next: any) => {
    req.classroomUC = classroomUC,
    req.classMajorUC = classMajorUC,
    req.studentUC = studentUC,
    req.staffUC = staffUC

    next()
})



web.use(cors());

web.use(userRouter);
web.use(errorMiddleware);