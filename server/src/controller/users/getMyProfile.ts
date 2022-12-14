import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);
import { ObjectId } from "mongodb";

const getMyProfile = async (req: Request, res: Response) => {
  const { name } = req.params;

  const _id = new ObjectId(res.locals.user.user_id);

  const db = client.db(name);
  const users = db.collection("users");

  try {
    const loggedInUser = await users.findOne({ _id });

    if (loggedInUser === null) {
      return res.json({
        message:
          "해당 토큰을 가진 User가 존재하지 않습니다. 그러니까 localStorage 에 있는 토큰을 삭제하시고 다시 로그인해주세요",
      });
    }
    const { id, posts, comments, follower, following, profile_img } =
      loggedInUser;

    if (loggedInUser) {
      return res.status(200).json({
        result: true,
        message: `${name} 님의  DB 에서 ${id}님의 프로필 조회 성공.`,
        user: {
          id,
          posts,
          comments,
          follower,
          following,
          profile_img,
          // postList: loggedInUser.postList,
        },
      });
    }

    return res.status(401).json({
      message: `${name} 님의  DB 에서 해당 유저가 존재하지 않습니다.`,
    });
  } catch (err) {
    console.log(err);
  }
};

export default getMyProfile;
