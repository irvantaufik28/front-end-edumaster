"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middleware/error-middleware");
const cors_1 = __importDefault(require("cors"));
const userRepository_1 = __importDefault(require("./repository/userRepository"));
const classroomService_1 = __importDefault(require("./service/classroomService"));
const classMajorService_1 = __importDefault(require("./service/classMajorService"));
const studentService_1 = __importDefault(require("./service/studentService"));
const staffService_1 = __importDefault(require("./service/staffService"));
const classroomUC = new classroomService_1.default(new userRepository_1.default());
const classMajorUC = new classMajorService_1.default();
const studentUC = new studentService_1.default();
const staffUC = new staffService_1.default();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: "*",
}));
exports.app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});
exports.app.use((req, res, next) => {
    req.classroomUC = classroomUC,
        req.classMajorUC = classMajorUC,
        req.studentUC = studentUC,
        req.staffUC = staffUC;
    next();
});
// app.use(userRouter);
exports.app.use(error_middleware_1.errorMiddleware);
const PORT = process.env.PORT || 4000;
exports.app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
//# sourceMappingURL=index.js.map