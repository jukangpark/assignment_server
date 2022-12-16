import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);
import { ObjectId } from "mongodb";

const follow = async (req: Request, res: Response) => {
  const { name, id } = req.params;

  const _id = new ObjectId(res.locals.user.user_id);

  const db = client.db(name);

  try {
    const users = db.collection("users");
    const followers = db.collection("followers");
    const loggedInUser = await users.findOne({ _id });
    const isExist = await followers.findOne({ [id]: loggedInUser.id });

    if (loggedInUser === null) {
      return res.json({
        message:
          "해당 토큰을 가진 User가 존재하지 않습니다. 그러니까 localStorage 에 있는 토큰을 삭제하시고 다시 로그인해주세요",
      });
    }

    if (loggedInUser.id === id) {
      return res.json({
        message: "나 자신을 팔로우할 수는 없습니다.",
      });
    }

    if (isExist) {
      await followers.findOneAndDelete({ [id]: id });
      return res.json({
        result: false,
        message: "해당 유저를 언팔 했습니다.",
      });
    }

    await followers.insertOne({ [id]: loggedInUser.id });
    return res.json({ result: true, message: `${id} 를 팔로우 하였습니다.` });
  } catch (err) {
    console.log(err);
  }
};

export default follow;
