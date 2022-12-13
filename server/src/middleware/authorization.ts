import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const verifyToken = (req: Request, res: Response, next: any) => {
  try {
    const clientToken = req.headers.authorization;
    const decoded = jwt.verify(
      String(clientToken),
      process.env.SECRET_KEY || "secret key"
    );
    if (decoded) {
      res.locals.user = decoded;
      next();
    } else {
      res.status(401).send({
        message: "권한이 없습니다",
        error: "unauthorized",
      });
    }
  } catch (err) {
    res
      .status(401)
      .json({ result: false, message: "토큰이 유요하지 않습니다." });
  }
};
