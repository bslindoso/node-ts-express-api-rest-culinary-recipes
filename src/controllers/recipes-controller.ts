import { Request, Response } from "express";
import * as RecipesService from '../services/recipes-service'

export const listRecipes = async (req: Request, res: Response) => {

  const httpResponse = await RecipesService.listRecipes(req.query)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}

export const getRecipeById = async (req: Request, res: Response) => {

  const httpResponse = await RecipesService.getRecipeById(parseInt(req.params.id))

  res.status(httpResponse.statuscode).json(httpResponse.body)
}

export const createRecipe = async (req: Request, res: Response) => {

  const httpResponse = await RecipesService.createRecipe(req.body)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}