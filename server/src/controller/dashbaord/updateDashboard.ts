import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
import { ObjectId } from "mongodb";
const client = new MongoClient(`${process.env.DB_URL}`);

const updateDashboard = async (req: Request, res: Response) => {
  const {
    params: { name: _id },
    body: { title, layers },
  } = req;

  const db = client.db("nkia");
  const dashboards = db.collection("dashboards");

  // 사용자가 입력한 dashboard 의 이름을 가져와서
  // {title: "사용자가 입력한 값", layers: []}
  const newDashboard = { title, layers };

  if (_id === "dashboard") {
    await dashboards.insertOne(newDashboard);
    return res
      .status(201)
      .json({ message: `${title} 대시보드가 저장되었습니다.` });
  }

  await dashboards.updateOne(
    { _id: new ObjectId(_id) },
    { $set: newDashboard }
  );

  // newDashboard 를 하나의 document 로 저장

  return res.status(201).json({ message: `${title} 로 업데이트 되었습니다.` });
};

export default updateDashboard;
