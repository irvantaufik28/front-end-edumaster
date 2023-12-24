"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwt_1 = __importDefault(require("../middleware/jwt"));
const userController_1 = __importDefault(require("../controller/userController"));
const classMajorController_1 = __importDefault(require("../controller/classMajorController"));
const classroomController_1 = __importDefault(require("../controller/classroomController"));
const roleController_1 = __importDefault(require("../controller/roleController"));
const studentController_1 = __importDefault(require("../controller/studentController"));
const studentParentController_1 = __importDefault(require("../controller/studentParentController"));
const staffController_1 = __importDefault(require("../controller/staffController"));
const uploadMediaController_1 = __importDefault(require("../controller/uploadMediaController"));
const handle_upload_1 = require("../middleware/handle-upload");
const authController_1 = __importDefault(require("../controller/authController"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post('/api/v1/login', authController_1.default.login);
userRouter.get('/api/v1/class/major-list', classMajorController_1.default.list);
userRouter.get('/api/v1/user', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), userController_1.default.get);
userRouter.get('/api/v1/user/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), userController_1.default.getById);
// classroom route
userRouter.get('/api/v1/classroom', classroomController_1.default.get);
userRouter.get('/api/v1/classroom/:id', classroomController_1.default.getById);
userRouter.post('/api/v1/classroom', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController_1.default.create);
userRouter.put('/api/v1/classroom/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController_1.default.update);
userRouter.delete('/api/v1/classroom/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController_1.default.deleted);
userRouter.post('/api/v1/classroom/move-student/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController_1.default.moveStudent);
userRouter.delete('/api/v1/classroom/delete/student', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController_1.default.deleteStudent);
// class major route
userRouter.get('/api/v1/class/major', classMajorController_1.default.get);
userRouter.get('/api/v1/class/major/:id', classMajorController_1.default.getById);
userRouter.post('/api/v1/class/major', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController_1.default.create);
userRouter.put('/api/v1/class/major/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController_1.default.update);
userRouter.delete('/api/v1/class/major/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController_1.default.deleted);
// role route
userRouter.get('/api/v1/role', roleController_1.default.get);
userRouter.post('/api/v1/role', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), roleController_1.default.create);
userRouter.post('/api/v1/user-role', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), roleController_1.default.createUserRole);
userRouter.delete('/api/v1/user-role', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), roleController_1.default.deleteUserRole);
// student route
userRouter.get('/api/v1/student', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentController_1.default.get);
userRouter.get('/api/v1/student/:id', studentController_1.default.getById);
userRouter.post('/api/v1/student', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentController_1.default.create);
userRouter.put('/api/v1/student/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentController_1.default.update);
// student Parent Route
userRouter.get('/api/v1/student-parent', studentParentController_1.default.get);
userRouter.get('/api/v1/student-parent/:id', studentParentController_1.default.getById);
userRouter.post('/api/v1/student-parent', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController_1.default.create);
userRouter.put('/api/v1/student-parent/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController_1.default.update);
userRouter.delete('/api/v1/student-parent/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController_1.default.deleted);
// staff route
userRouter.get('/api/v1/staff', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), staffController_1.default.get);
userRouter.get('/api/v1/staff/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), staffController_1.default.getById);
userRouter.post('/api/v1/staff', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), staffController_1.default.create);
userRouter.put('/api/v1/staff/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), staffController_1.default.update);
//media upload
userRouter.post('/api/v1/upload', handle_upload_1.upload.single('file'), jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), uploadMediaController_1.default.upload);
//# sourceMappingURL=api.js.map