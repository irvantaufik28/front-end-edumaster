import express from "express";
import { errorMiddleware } from "./middleware/error-middleware";
import { userRouter } from "./routes/api";
import cors from "cors"

import UserRepository from "./repository/userRepository";
import ClassroomService from "./service/classroomService";
import ClassMajorService from "./service/classMajorService";
import StudentService from "./service/studentService";
import StaffService from "./service/staffService";
import { logger } from "./application/logging";

const classroomUC = new ClassroomService(new UserRepository())
const classMajorUC = new ClassMajorService()
const studentUC = new StudentService()
const staffUC = new StaffService()

export const app = express();


app.use(express.json());
app.use((req: any, res: any, next: any) => {
    req.classroomUC = classroomUC,
    req.classMajorUC = classMajorUC,
    req.studentUC = studentUC,
    req.staffUC = staffUC

    next()
})



// app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
  });

// app.use(userRouter);
// app.use(errorMiddleware);

export default app
