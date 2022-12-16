import express from "express";

import createPost from "../controller/posts/createPost";
import postAll from "../controller/posts/postAll";
import updatePost from "../controller/posts/updatePost";
import viewPost from "../controller/posts/viewPost";
import { verifyToken } from "../middleware/authorization";
import deletePost from "../controller/posts/deletePost";

const postRouter = express.Router();

postRouter.route("/:name").get(postAll).post(verifyToken, createPost); // 전체 조회
postRouter.route("/:id/:name").get(viewPost).put(verifyToken, updatePost);
postRouter.route("/:id/delete/:name").post(verifyToken, deletePost); // 게시물 삭제

export default postRouter;
