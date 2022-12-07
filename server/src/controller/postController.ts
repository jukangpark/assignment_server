import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

export const postAll = async (req: Request, res: Response) => {
  const {
    params: { name },
  } = req;

  // const db = await client.db(name);

  // const posts = await client.db(name).collection("posts");

  // console.log(posts);

  return res.json(["1"]);
};

export const createPost = async (req: Request, res: Response) => {
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
