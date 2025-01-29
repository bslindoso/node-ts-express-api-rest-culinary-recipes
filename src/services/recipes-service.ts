import { HttpResponse } from "../models/http-response-model"
import { RecipeModel } from "../models/recipe-model"
import * as RecipesRepository from "../repositories/recipes-repository"
import { StatusCode } from "../utils/status-code"
import * as httpResponse from "../utils/http-response-helper"

export const listRecipes = async (): Promise<HttpResponse> => {

  const data: RecipeModel[] = await RecipesRepository.getRecipesList()

  return httpResponse.ok(data)
}