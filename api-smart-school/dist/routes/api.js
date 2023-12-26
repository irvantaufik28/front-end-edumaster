"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const router = express_1.default.Router();
router.post('/login', authController_1.default.login);
router.get('/class/major-list', classMajorController_1.default.list);
router.get('/user', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), userController_1.default.get);
router.get('/user/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), userController_1.default.getById);
// classroom route
router.get('/classroom', classroomController_1.default.get);
router.get('/classroom/:id', classroomController_1.default.getById);
router.post('/classroom', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController_1.default.create);
router.put('/classroom/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController_1.default.update);
router.delete('/classroom/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController_1.default.deleted);
router.post('/classroom/move-student/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController_1.default.moveStudent);
router.delete('/classroom/delete/student', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classroomController_1.default.deleteStudent);
// class major route
router.get('/class/major', classMajorController_1.default.get);
router.get('/class/major/:id', classMajorController_1.default.getById);
router.post('/class/major', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController_1.default.create);
router.put('/class/major/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController_1.default.update);
router.delete('/class/major/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), classMajorController_1.default.deleted);
// role route
router.get('/role', roleController_1.default.get);
router.post('/role', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), roleController_1.default.create);
router.post('/user-role', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), roleController_1.default.createUserRole);
router.delete('/user-role', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), roleController_1.default.deleteUserRole);
// student route
router.get('/student', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentController_1.default.get);
router.get('/student/:id', studentController_1.default.getById);
router.post('/student', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentController_1.default.create);
router.put('/student/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentController_1.default.update);
// student Parent Route
router.get('/student-parent', studentParentController_1.default.get);
router.get('/student-parent/:id', studentParentController_1.default.getById);
router.post('/student-parent', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController_1.default.create);
router.put('/student-parent/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController_1.default.update);
router.delete('/student-parent/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), studentParentController_1.default.deleted);
// staff route
router.get('/staff', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), staffController_1.default.get);
router.get('/staff/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), staffController_1.default.getById);
router.post('/staff', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), staffController_1.default.create);
router.put('/staff/:id', jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), staffController_1.default.update);
//media upload
router.post('/upload', handle_upload_1.upload.single('file'), jwt_1.default.allowedRoles(["administrator", "manager", "staff_tu"]), uploadMediaController_1.default.upload);
exports.default = router;
//# sourceMappingURL=api.js.map