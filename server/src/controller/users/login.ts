import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ------ 로그인
const login = async (req: Request, res: Response) => {
  const { name } = req.params;
  const { id, password } = req.body;

  // console.log(id, password);

  try {
    const db = client.db(name);
    const users = db.collection("users");

    const user = await users.findOne({ id });

    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (isCorrectPassword) {
        const token = jwt.sign(
          {
            user_id: user._id,
            id,
          },
          process.env.SECRET_KEY || "secret key",
          {
            expiresIn: "10h",
          }
        );

        return res
          .status(200)
          .send({ result: true, message: "로그인 완료", token })
          .end();
      } else {
        return res.json({ message: "비밀번호가 일치하지 않습니다." });
      }
    } else {
      return res.json({ message: "해당 유저가 존재하지 않습니다" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default login;
