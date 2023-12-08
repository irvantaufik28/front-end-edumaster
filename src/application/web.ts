import express from "express";
// import {publicRouter} from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware";
import { userRouter } from "../routes/api";
import { classroomRoute } from "../routes/classroomRoute";
import UserRepository from "../repository/userRepository";
import ClassroomService from "../service/classroomService";
import ClassMajorService from "../service/classMajorService";
import { classMajorRoute } from "../routes/classMajorRoute";

const classroomUC = new ClassroomService(new UserRepository())
const classMajorUC = new ClassMajorService()


export const web = express();


web.use(express.json());
web.use((req: any, res: any, next: any) => {
    req.classroomUC = classroomUC,
    req.classMajorUC = classMajorUC

    next()
})


// web.use(publicRouter);
web.use(userRouter);
web.use(classroomRoute);
web.use(classMajorRoute);

web.use(errorMiddleware);