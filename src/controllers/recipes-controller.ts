import { Request, Response } from "express";

export const listRecipes = (req: Request, res: Response) => {
  res.status(200).json({ message: "ok" })
}