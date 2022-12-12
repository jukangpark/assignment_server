import { Request, Response } from "express";
import bcrypt, { hash } from "bcrypt";
const { MongoClient } = require("mongodb");
import jwt from "jsonwebtoken";
const client = new MongoClient(`${process.env.DB_URL}`);

export const join = async (req: Request, res: Response) => {
  const { name } = req.params;
  const { id, password } = req.body;

  try {
    const db = client.db(name);
    const users = db.collection("users");

    const isExist = await users.findOne({ id });

    if (isExist) {
      return res
        .status(400)
        .json({ message: "해당 이메일을 가진 유저가 존재" });
    } else {
      const doc = {
        id,
        password: await bcrypt.hash(password, 5),
      };

      const result = await users.insertOne(doc);
      console.log(result);
      return res.status(201).json({ message: "회원가입 완료" });
    }
  } catch (error) {
    console.log(error);
  }
};

// ------ 로그인
export const login = async (req: Request, res: Response) => {
  const { name } = req.params;
  const { id, password } = req.body;

  console.log(id, password);

  try {
    const db = client.db(name);
    const users = db.collection("users");

    const user = await users.findOne({ id });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      console.log("패스 워드 일치");
      const token = jwt.sign(
        {
          user_id: user._id,
        },
        "secret key",
        {
          expiresIn: "10h",
        }
      );

      // console.log(token);

      // res.cookie("user", token);

      return res
        .status(200)
        .send({ result: true, message: "로그인 완료", token })
        .end();
    }
  } catch (error) {
    console.log(error);
  }

  return res.status(201).json({ message: "로그인 완료" });
};

export const getProfile = async (req: Request, res: Response) => {
  const { id, name } = req.params;

  return res.status(201).json({
    message: `${name} 님의  DB 에서 ${id}님의 프로필 조회 성공.`,
  });
};

export const deleteProfile = async (req: Request, res: Response) => {
  const { id, name } = req.params;

  return res.status(201).json({
    message: `${name} 님의  DB 에서 ${id}님의 계정 삭제 성공.`,
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  const { id, name } = req.params;

  return res.status(201).json({
    message: `${name} 님의  DB 에서 ${id}님의 계정 삭제 성공.`,
  });
};
