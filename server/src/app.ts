require("dotenv").config();
const isHeroku = process.env.NODE_ENV === "production";
import cookieParser from "cookie-parser";
import http from "http";
import WebSocket from "ws";

import "./db";
import express, { NextFunction, Request, Response } from "express";

import userRouter from "./router/userRouter";
import postRouter from "./router/postRouter";
import dashboardRouter from "./router/dashboardRouter";

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

const handleListen = () => {
  console.log(`Server is Listening on PORT:${PORT} `);
};
app.use("/user", userRouter);
app.use("/posts", postRouter);
app.use("/dashboard", dashboardRouter);

app.get("/test", (req, res) => {
  return res.json({ message: "연결완료" });
});

// app.listen(PORT, handleListen);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
server.listen(9000, handleListen);

let sockets: any[] = [];

wss.on("connection", (socket: WebSocket) => {
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected from the Browser"));
  // socket.send("안녕");

  socket.on("message", (message) => {
    console.log(message.toString());
    sockets.forEach((aSocket) => aSocket.send(message.toString()));
    // const jsonData = JSON.parse(data.toString());
    // console.log(typeof jsonData);
    // console.log(jsonData);
  });
});

// 서로 다른 브라우저에서 서로에게 보낸 메시지를 받을 수 있으려면

// sockets.forEach((socket) => socket.send(message));
// 그래서 서버가 braveBrowser 에서 메시지를 받아서 구글 크롬으로 보내려면,
// 누가 connected 되었는지를 알 수 있어야함.

// fake database =>
// const sockets = [] 누군가 우리 서버에 연결되면, 그 connection 을 [] 에 넣는다.
// sockets.push(socket);
// 이렇게 하면 받은 메시지를 다른 모든 socket 들에게 전달 해 줄 수 있음.
//
