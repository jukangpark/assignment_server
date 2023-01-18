import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

const createDashboard = async (req: Request, res: Response) => {
  const {
    body,
    body: { title, layers },
    // params: { title },
  } = req;

  const canvas = body;
  // 사용자가 입력한 dashboard 의 이름을 가져와서
  // {title: "사용자가 입력한 값", layers: []}
  //

  const newDashboard = { title, layers };

  console.log(newDashboard);

  // newDashboard 를 하나의 document 로 저장

  const nkia = client.db("nkia");
  const dashboards = nkia.collection("dashboards");

  await dashboards.insertOne(canvas);

  return res.status(201).json({ message: "대시보드가 생성되었습니다." });
};

export default createDashboard;
