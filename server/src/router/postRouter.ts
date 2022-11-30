import express from "express";
import { postAll } from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/all/:name").get(postAll);

export default postRouter;
