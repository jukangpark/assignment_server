import { Request, Response } from "express";
import { ObjectId } from "mongodb";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

const viewPost = async (req: Request, res: Response) => {
  const { id, name } = req.params;

  const db = client.db(name);
  const posts = db.collection("posts");

  try {
    const post = await posts.findOne({ _id: new ObjectId(id) });
    if (post) {
      return res.json(post);
    } else {
      return res.json({ message: "해당 게시물이 존재하지 않습니다." });
    }
  } catch (err) {
    console.log(err);
  }
};

export default viewPost;
