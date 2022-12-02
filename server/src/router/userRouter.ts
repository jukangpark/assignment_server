import express from "express";
import {
  deleteProfile,
  getProfile,
  join,
  login,
  updateProfile,
} from "../controller/userController";

const userRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /user/nickname:
 *   post:
 *    tags:
 *    - user
 *    description: 닉네임 조회
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       properties:
 *        id:
 *         type: string
 *        pw:
 *         type: string
 *
 *    responses:
 *     200:
 *      description: 닉네임 조회 성공
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *     401:
 *      description: 닉네임 조회 실패
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *
 */

userRouter.route("/join/:name").post(join); // 유저 생성
userRouter.route("/login/:name").post(login); // 유저 로그인
userRouter.route("/:id/:name").get(getProfile); // 유저 프로필 조회
userRouter.route("/:id/:name").put(updateProfile); // 유저 프로필 업데이트
userRouter.route("/:id/:name").delete(deleteProfile); // 유저 프로필 삭제

export default userRouter;
