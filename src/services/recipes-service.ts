import { HttpResponse } from "../models/http-response-model"
import { RecipeModel } from "../models/recipe-model"
import * as RecipesRepository from "../repositories/recipes-repository"
import * as httpResponse from "../utils/http-response-helper"
import allowedRecipesParams from "./utils/allowed-recipes-params"
import { buildRecipeQuery } from "./utils/queries/build-recipe-query"

export const listRecipes = async (params: object): Promise<HttpResponse> => {

  let data: RecipeModel[]

  // QUERY PARAMS
  if (Object.keys(params).length !== 0) {

    // check if params is one of allowed
    const allowedParams = allowedRecipesParams()
    const hasInvalidParams = Object.keys(params).some(param => !allowedParams.includes(param))
    if (hasInvalidParams) {
      return httpResponse.badRequest("One or more parameters are invalid.")
    }
    // dynamically builds the json-query
    const query = buildRecipeQuery(params).toLowerCase()

    data = await RecipesRepository.getRecipesList(query)
  }
  else { // NO QUERY PARAMS (LIST ALL RECIPES)    
    data = await RecipesRepository.getRecipesList()
  }

  return httpResponse.ok(data)
}