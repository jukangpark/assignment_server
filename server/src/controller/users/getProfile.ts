import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

const getProfile = async (req: Request, res: Response) => {
  const { id, name } = req.params;

  const db = client.db(name);
  const users = db.collection("users");

  try {
    const user = await users.findOne({ id });
    const { posts, comments, follower, following, profile_img, postList } =
      user;
    if (user) {
      return res.status(200).json({
        id: user.id,
        posts,
        comments,
        follower,
        following,
        profile_img,
        // postList,
      });
    } else {
      return res.json({ message: "해당 유저가 db 에 존재하지 않습니다." });
    }
  } catch (error) {
    console.log(error);
  }
};

export default getProfile;
