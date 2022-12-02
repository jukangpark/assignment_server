import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

export const join = async (req: Request, res: Response) => {
  const { name } = req.params;
  console.log(name);
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

export const login = async (req: Request, res: Response) => {
  const { name } = req.params;
  console.log(name);
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

/**
 * @swagger
 *  /product:
 *    get:
 *      tags:
 *        - /path/{path_parameter_name}
 *      description: 모든 제품 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: category
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 제품 조회 성공
 */
export const updateProfile = async (req: Request, res: Response) => {
  const { id, name } = req.params;

  return res.status(201).json({
    message: `${name} 님의  DB 에서 ${id}님의 계정 삭제 성공.`,
  });
};
