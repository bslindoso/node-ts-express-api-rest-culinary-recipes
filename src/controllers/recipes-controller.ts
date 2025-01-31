import { Request, Response } from "express";
import * as RecipesService from '../services/recipes-service'

export const listRecipes = async (req: Request, res: Response) => {

  const httpResponse = await RecipesService.listRecipes(req.query)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}

export const getRecipeById = async (req: Request, res: Response) => {

  const httpResponse = await RecipesService.getRecipe(req.params.id)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}

export const createRecipe = async (req: Request, res: Response) => {

  const httpResponse = await RecipesService.createRecipe(req.body)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}

export const updateRecipe = async (req: Request, res: Response) => {

  const httpResponse = await RecipesService.updateRecipe(req.params.id, req.body)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}

export const deleteRecipe = async (req: Request, res: Response) => {
  const httpResponse = await RecipesService.deleteRecipe(req.params.id)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}

export const createRecipeRating = async (req: Request, res: Response) => {

  const httpResponse = await RecipesService.createRecipeRating(req.params.id, req.body)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}