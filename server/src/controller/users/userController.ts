import { Request, Response } from "express";

export const deleteProfile = async (req: Request, res: Response) => {
  const { id, name } = req.params;

  return res.status(201).json({
    message: `${name} 님의  DB 에서 ${id}님의 계정 삭제 성공.`,
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  const { id, name } = req.params;

  return res.status(201).json({
    message: `${name} 님의  DB 에서 ${id}님의 계정 삭제 성공.`,
  });
};
