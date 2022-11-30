import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

export const postAll = async (req: Request, res: Response) => {
  const {
    params: { name },
  } = req;
  console.log(name);
  const posts = await client.db(name).collection("posts");
  const post = await posts.findOne();
  console.log(post);

  return res.send([post]);
};
