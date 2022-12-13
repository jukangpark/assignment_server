import { Request, Response } from "express";
import { ObjectId } from "mongodb";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

const createPost = async (req: Request, res: Response) => {
  const _id = new ObjectId(res.locals.user.user_id);
  const {
    params: { name },
    body: { title, content, password },
  } = req;

  try {
    const db = client.db(name);
    const posts = db.collection("posts");
    const users = db.collection("users");

    const { id } = await users.findOne({ _id });

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const hour = now.getHours();
    const minutes = now.getMinutes();

    const doc = {
      title,
      content,
      password,
      author: { id },
      createdAt: `${year} 년 ${month} 월 ${date}일 ${hour}시 ${minutes} 분`,
    };

    const result = await posts.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.log(error);
  }

  return res.status(201).json({ message: "게시물이 생성되었습니다." });
};

export default createPost;
