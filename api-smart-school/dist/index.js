"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import { errorMiddleware } from "./middleware/error-middleware";
// import { userRouter } from "./routes/api";
// import cors from "cors"
// import UserRepository from "./repository/userRepository";
// import ClassroomService from "./service/classroomService";
// import ClassMajorService from "./service/classMajorService";
// import StudentService from "./service/studentService";
// import StaffService from "./service/staffService";
// import { logger } from "./application/logging";
// const classroomUC = new ClassroomService(new UserRepository())
// const classMajorUC = new ClassMajorService()
// const studentUC = new StudentService()
// const staffUC = new StaffService()
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// app.use(cors({
//   origin: "*",
// }));
exports.app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});
//   app.use((req: any, res: any, next: any) => {
//     req.classroomUC = classroomUC,
//     req.classMajorUC = classMajorUC,
//     req.studentUC = studentUC,
//     req.staffUC = staffUC
//     next()
// })
// app.use(userRouter);
// app.use(errorMiddleware);
const PORT = process.env.PORT || 4000;
exports.app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
//# sourceMappingURL=index.js.map