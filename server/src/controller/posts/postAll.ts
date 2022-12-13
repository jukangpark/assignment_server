import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

const postAll = async (req: Request, res: Response) => {
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

export default postAll;
