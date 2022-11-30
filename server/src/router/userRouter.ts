import express from "express";
import { join } from "../controller/userController";
import wrapAsyncController from "../middleware/wrapAsyncController";

const userRouter = express.Router();

userRouter.route("/join").post(wrapAsyncController(join));

export default userRouter;
