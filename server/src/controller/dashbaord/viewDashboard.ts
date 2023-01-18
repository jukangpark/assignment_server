import { Request, Response } from "express";
const { MongoClient } = require("mongodb");
const client = new MongoClient(`${process.env.DB_URL}`);

const viewDashboard = async (req: Request, res: Response) => {
  const db = await client.db("nkia");
  const dashboards = db.collection("dashboards");

  const cursor = dashboards.find({});

  const result: any = [];

  if ((await cursor.count()) === 0) {
    console.log("No documents found!");
  }

  await cursor.forEach((item: object) => {
    result.push(item);
  });

  res.json(result);
};

export default viewDashboard;
