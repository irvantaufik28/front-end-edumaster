import express, { Router } from "express";
import classMajorController from "../controller/classMajorController";

const classMajorRoute = express.Router();

classMajorRoute.get('/api/class/major', classMajorController.get);
classMajorRoute.get('/api/class/major/:id', classMajorController.getById);
classMajorRoute.post('/api/class/major', classMajorController.create);

export {
    classMajorRoute
}
