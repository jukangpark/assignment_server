import express from "express";
import {
  deleteProfile,
  getProfile,
  join,
  login,
  updateProfile,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.route("/join/:name").post(join); // 유저 생성
userRouter.route("/login/:name").post(login); // 유저 로그인
userRouter.route("/:id/:name").get(getProfile); // 유저 프로필 조회
userRouter.route("/:id/:name").put(updateProfile); // 유저 프로필 업데이트
userRouter.route("/:id/:name").delete(deleteProfile); // 유저 프로필 삭제

export default userRouter;
