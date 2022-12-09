import express from "express";
import {
  createPost,
  deletePost,
  editPost,
  postAll,
  viewPost,
} from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/:name").get(postAll).post(createPost); // 전체 조회
postRouter.route("/:id/:name").get(viewPost);
postRouter.route("/:id/:name").put(editPost); // 게시물 수정
postRouter.route("/:id/:name").delete(deletePost); // 게시물 삭제

export default postRouter;
