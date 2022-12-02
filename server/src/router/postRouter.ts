import express from "express";
import {
  createPost,
  deletePost,
  editPost,
  postAll,
  viewPost,
} from "../controller/postController";

const postRouter = express.Router();

/**
 *  @swagger
 *  paths:
 *   /books:
 *     get:
 *       summary: Lists all the books
 *       tags: [Books]
 *       responses:
 *         "200":
 *           description: The list of books.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Book'
 *     post:
 *       summary: Creates a new book
 *       tags: [Books]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       responses:
 *         "200":
 *           description: The created book.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Book'
 */
postRouter.route("/:name").get(postAll); // 전체 조회
postRouter.route("/:id/:name").get(viewPost).post(createPost); // 게시물 전체 보기 및 추가
postRouter.route("/:id/:name").put(editPost); // 게시물 수정
postRouter.route("/:id/:name").delete(deletePost); // 게시물 삭제

export default postRouter;
