import { HttpResponse } from "../models/http-response-model"
import { RecipeModel } from "../models/recipe-model"
import * as RecipesRepository from "../repositories/recipes-repository"
import * as response from "../utils/http-response-helper"
import { HttpStatusMessage as Messages } from "../utils/http-response-helper"
import { isRecipeModel } from "../validators/recipe-validator"
import allowedRecipesParams from "./utils/allowed-recipes-params"
import { buildRecipeQuery } from "./utils/queries/build-recipe-query"

export const listRecipes = async (params: object): Promise<HttpResponse> => {

  let data: RecipeModel[] | Messages
  // QUERY PARAMS
  if (Object.keys(params).length !== 0) {

    // check if params is one of allowed
    const allowedParams = allowedRecipesParams()
    const hasInvalidParams = Object.keys(params).some(param => !allowedParams.includes(param))
    if (hasInvalidParams) {
      return response.badRequest(Messages.INVALID_PARAMETERS)
    }
    // dynamically builds the json-query
    const query = buildRecipeQuery(params).toLowerCase()

    data = await RecipesRepository.getRecipesList(query)
  }
  else { // NO QUERY PARAMS (LIST ALL RECIPES)    
    data = await RecipesRepository.getRecipesList()
  }

  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()

  return response.ok(data)
}

export const getRecipeById = async (id: number): Promise<HttpResponse> => {

  const data: RecipeModel | Messages = await RecipesRepository.getRecipeById(id)

  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()
  if (data === Messages.NOT_FOUND) return response.notFound('Recipes ' + Messages.NOT_FOUND)

  return response.ok(data)
}

export const createRecipe = async (body: object): Promise<HttpResponse> => {
  if (!isRecipeModel(body)) return response.badRequest(Messages.INVALID_PROPERTIES)

  const data = await RecipesRepository.addNewRecipe(body)

  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()

  return response.ok(body)
}