import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
import { ObjectId } from "mongodb";
const client = new MongoClient(`${process.env.DB_URL}`);

const createDashboard = async (req: Request, res: Response) => {
  const {
    body: { title, layers },
    params: { name: _id },
  } = req;

  const newDashboard = { title, layers };

  const nkia = client.db("nkia");
  const dashboards = nkia.collection("dashboards");

  if (_id === "dashboard") {
    const nowTime = new Date();
    const date = nowTime.toLocaleString("ko-kr");
    const nameIsDateDashboard = { title: date, layers };
    await dashboards.insertOne(nameIsDateDashboard);
    return res
      .status(201)
      .json({ message: `${date} 대시보드가 저장되었습니다.` });
  }
  console.log(_id);

  if (layers.length === 0) {
    await dashboards.insertOne(newDashboard);

    return res.status(201).json({ message: "대시보드가 생성되었습니다." });
  }

  // 사용자가 입력한 dashboard 의 이름을 가져와서
  // {title: "사용자가 입력한 값", layers: []}
  //

  const isExists = await dashboards.findOne({ _id: new ObjectId(_id) });

  if (isExists) {
    console.log(isExists);
    await dashboards.updateOne(
      { _id: new ObjectId(_id) },
      { $set: newDashboard }
    );
    return res
      .status(201)
      .json({ message: `${_id} 대시보드를 저장하였습니다.` });
  }

  // newDashboard 를 하나의 document 로 저장
};

export default createDashboard;
