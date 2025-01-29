import { Request, Response } from "express";
import * as RecipesService from '../services/recipes-service'
import { HttpResponse } from "../models/http-response-model";

export const listRecipes = async (req: Request, res: Response) => {
  const httpresponse: HttpResponse = await RecipesService.listRecipes()
  res.status(httpresponse.statuscode).json(httpresponse.body)
}