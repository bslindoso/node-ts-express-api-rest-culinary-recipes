import { Request, Response } from "express";
import * as RecipesService from '../services/recipes-service'
import { HttpResponse } from "../models/http-response-model";

export const listRecipes = async (req: Request, res: Response) => {

  const httpResponse = await RecipesService.listRecipes(req.query)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}