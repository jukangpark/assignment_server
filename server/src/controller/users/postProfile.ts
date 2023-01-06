import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

const postProfile = async (req: any, res: Response) => {
  console.log(req);
  const { id, name } = req.params;

  const db = client.db(name);
  const users = db.collection("users");

  return res.json({ message: "프로필 이미지가 변경되었습니다." });
};

export default postProfile;
