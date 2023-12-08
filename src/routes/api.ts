import express, { Router } from "express";
import userController from "../controller/userController";

const userRouter = express.Router();

userRouter.get('/test', userController.get);

export {
    userRouter
}
