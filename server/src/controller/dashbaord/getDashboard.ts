import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
import { ObjectId } from "mongodb";
const client = new MongoClient(`${process.env.DB_URL}`);

const getDashboard = async (req: Request, res: Response) => {
  const {
    params: { name: _id },
  } = req;
  console.log(_id);
  const db = await client.db("nkia");
  const dashboards = db.collection("dashboards");

  try {
    const dashboard = await dashboards.findOne({ _id: new ObjectId(_id) });

    if (dashboard) {
      return res.json(dashboard);
    } else {
      return res.json({ message: "해당 게시물이 존재하지 않습니다." });
    }
  } catch (err) {
    console.log(err);
  }
};

export default getDashboard;
