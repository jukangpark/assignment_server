import { Request, Response } from "express";
import { ObjectId } from "mongodb";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

const updatePost = async (req: Request, res: Response) => {
  const {
    params: { id, name },
    body: { title, content, password },
  } = req;

  try {
    const db = client.db(name);
    const posts = db.collection("posts");

    const post = await posts.findOne({ _id: new ObjectId(id) });

    if (post.author === res.locals.user.id) {
      if (post.password === password) {
        await posts.updateOne(
          { _id: new ObjectId(id) },
          { $set: { title, content } }
        );

        return res.json({ message: "업데이트 되었습니다." });
      } else {
        return res.json({ message: "비밀번호가 일치하지 않습니다." });
      }
    } else {
      return res.json({ message: "해당 게시물에 권한이 없습니다." });
    }
  } catch (err) {
    console.log(err);
  }
};

export default updatePost;
