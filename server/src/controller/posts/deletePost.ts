import { Request, Response } from "express";
import { ObjectId } from "mongodb";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

const deletePost = async (req: Request, res: Response) => {
  const {
    params: { id, name },
    body: { password },
  } = req;

  try {
    const db = client.db(name);
    const users = db.collection("users");
    const user = await users.findOne({
      _id: new ObjectId(res.locals.user.user_id),
    });

    const posts = db.collection("posts");
    const post = await posts.findOne({ _id: new ObjectId(id) });

    if (post.author.id === user.id) {
      if (post.password === password) {
        await posts.deleteOne({ _id: post._id });
        return res.json({ result: true, message: "게시물을 삭제하였습니다." });
      } else {
        return res.json({
          result: false,
          message: "비밀번호가 일치하지 않습니다.",
        });
      }
    } else {
      return res.json({
        result: false,
        message: "해당 게시물의 소유자가 아닙니다.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default deletePost;
