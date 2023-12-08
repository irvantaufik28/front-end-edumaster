import express, { Router } from "express";
import classroomController from "../controller/classroomController";

const classroomRoute = express.Router();

classroomRoute.get('/api/classroom', classroomController.get);
classroomRoute.post('/api/classroom', classroomController.create);

export {
    classroomRoute
}
