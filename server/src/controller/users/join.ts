import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);
import bcrypt, { hash } from "bcrypt";

export const join = async (req: Request, res: Response) => {
  const { name } = req.params;
  const { id, password } = req.body;

  try {
    const db = client.db(name);
    const users = db.collection("users");

    const isExist = await users.findOne({ id });

    const hashedPassword = await bcrypt.hash(password, 5);

    if (isExist) {
      return res
        .status(400)
        .json({ message: "해당 아이디를 가진 유저가 존재" });
    } else {
      const newUser = {
        id,
        password: hashedPassword,
        posts: [],
        comments: 0,
        follower: 0,
        following: 0,
        profile_img: 0,
      };

      const result = await users.insertOne(newUser);
      console.log(result);
      return res.status(201).json({ message: "회원가입 완료" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default join;
