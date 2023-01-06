require("dotenv").config();
const isHeroku = process.env.NODE_ENV === "production";
import cookieParser from "cookie-parser";
// const https = require("https");

import "./db";
import express, { NextFunction, Request, Response } from "express";

import userRouter from "./router/userRouter";
import postRouter from "./router/postRouter";

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const app = express();
const cors = require("cors");
app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // 여기는 에러 핸들러, 모든 에러가 여기를 지나게 됨.
  res.status(500).json({
    message: "Server Error",
    error: err,
  });
});

const PORT = process.env.PORT || 9000;

app.use("/user", userRouter);
app.use("/posts", postRouter);

app.get("/test", (req, res) => {
  return res.json({ message: "연결완료" });
});

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT:${PORT} `);
});
