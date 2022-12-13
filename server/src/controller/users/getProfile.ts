import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);
import { ObjectId } from "mongodb";

const getProfile = async (req: Request, res: Response) => {
  const { name } = req.params;

  const _id = new ObjectId(res.locals.user.user_id);

  const db = client.db(name);
  const users = db.collection("users");

  try {
    const loggedInUser = await users.findOne({ _id });
    // console.log(loggedInUser);

    if (loggedInUser) {
      return res.status(200).json({
        result: true,
        message: `${name} 님의  DB 에서 ${loggedInUser.id}님의 프로필 조회 성공.`,
        user: {
          id: loggedInUser.id,
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

export default getProfile;
