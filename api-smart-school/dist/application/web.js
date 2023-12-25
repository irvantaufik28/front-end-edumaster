"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("../middleware/error-middleware");
const api_1 = require("../routes/api");
const cors_1 = __importDefault(require("cors"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const classroomService_1 = __importDefault(require("../service/classroomService"));
const classMajorService_1 = __importDefault(require("../service/classMajorService"));
const studentService_1 = __importDefault(require("../service/studentService"));
const staffService_1 = __importDefault(require("../service/staffService"));
const classroomUC = new classroomService_1.default(new userRepository_1.default());
const classMajorUC = new classMajorService_1.default();
const studentUC = new studentService_1.default();
const staffUC = new staffService_1.default();
exports.web = (0, express_1.default)();
exports.web.use(express_1.default.json());
exports.web.use((req, res, next) => {
    req.classroomUC = classroomUC,
        req.classMajorUC = classMajorUC,
        req.studentUC = studentUC,
        req.staffUC = staffUC;
    next();
});
exports.web.use((0, cors_1.default)());
exports.web.use(api_1.userRouter);
exports.web.use(error_middleware_1.errorMiddleware);
//# sourceMappingURL=web.js.map