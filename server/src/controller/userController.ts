import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

export const join = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const users = await client.db("juflearn").collection("users");
  const isExist = await users.findOne({ email });

  if (isExist) {
    return res.status(400).json({ message: "해당 이메일을 가진 유저가 존재" });
  } else {
    const doc = {
      email,
      password,
    };

    const result = await users.insertOne(doc);
    console.log(result);
    return res.status(201).json({ message: "회원가입 완료" });
  }
};
