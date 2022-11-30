import { NextFunction, Request, Response } from "express";

const wrapAsyncController = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default wrapAsyncController;
