import express from "express";
import {
  deleteProfile,
  updateProfile,
} from "../controller/users/userController";

import join from "../controller/users/join";
import login from "../controller/users/login";
import getMyProfile from "../controller/users/getMyProfile";
import { verifyToken } from "../middleware/authorization";
import getProfile from "../controller/users/getProfile";
import follow from "../controller/users/follow";
import postProfile from "../controller/users/postProfile";

const userRouter = express.Router();

userRouter.route("/join/:name").post(join); // 유저 생성
userRouter.route("/login/:name").post(login); // 유저 로그인
userRouter.route("/myProfile/:name").get(verifyToken, getMyProfile); // 나의 프로필 조회
userRouter.route("/:id/:name").get(getProfile).post(postProfile); // 모든 사람들 프로필 조회
userRouter.route("/:id/:name").put(updateProfile); // 유저 프로필 업데이트
userRouter.route("/:id/:name").delete(deleteProfile); // 유저 프로필 삭제
userRouter.route("/:id/follow/:name").post(verifyToken, follow); // 해당 유저 팔로우

export default userRouter;
