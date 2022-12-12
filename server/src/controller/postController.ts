import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

export const postAll = async (req: Request, res: Response) => {
  const {
    params: { name },
  } = req;

  const result: any = [];
  try {
    const db = await client.db(name);
    const posts = db.collection("posts");

    const query = {};
    const cursor = posts.find(query);

    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }

    await cursor.forEach((item: object) => {
      result.push(item);
    });
  } catch (error) {
    console.log(error);
  }

  return res.json(result);
};

export const createPost = async (req: Request, res: Response) => {
  const {
    params: { name },
    body: { title, content, password },
  } = req;

  try {
    const db = client.db(name);
    const posts = db.collection("posts");

    const doc = {
      title,
      content,
      password,
    };

    const result = await posts.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.log(error);
  }

  return res.status(201).json({ message: "게시물이 생성되었습니다." });
};

export const viewPost = async (req: Request, res: Response) => {
  const { id, name } = req.params;
  return res.json([{ id }]);
};

export const editPost = async (req: Request, res: Response) => {
  const { id, name } = req.params;
  return res.json([{ message: "게시물이 수정되었습니다." }]);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id, name } = req.params;
  return res.json([{ message: "게시물이 삭제되었습니다." }]);
};
