import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

export const editPost = async (req: Request, res: Response) => {
  const { id, name } = req.params;
  return res.json([{ message: "게시물이 수정되었습니다." }]);
};
