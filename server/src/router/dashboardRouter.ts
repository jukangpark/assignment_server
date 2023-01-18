import express from "express";
import createDashboard from "../controller/dashbaord/createDashboard";
import getDashboard from "../controller/dashbaord/getDashboard";
import viewDashboard from "../controller/dashbaord/viewDashboard";

const dashboardRouter = express.Router();

dashboardRouter.route("/viewAll").get(viewDashboard); // 전체 조회
dashboardRouter.route("/:name").get(getDashboard).post(createDashboard); // dashboard 생성

export default dashboardRouter;
