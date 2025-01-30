import { HttpResponse } from "../models/http-response-model"
import { RecipeModel } from "../models/recipe-model"
import * as RecipesRepository from "../repositories/recipes-repository"
import * as response from "../utils/http-response-helper"
import { HttpStatusMessage as Messages } from "../utils/http-response-helper"
import { isRecipeModel } from "../validators/recipe-validator"
import * as validator from "../validators/recipe-validator"
import { buildRecipeQuery } from "./utils/queries/build-recipe-query"

export const listRecipes = async (params: object): Promise<HttpResponse> => {

  let data: RecipeModel[] | Messages
  // QUERY PARAMS
  if (Object.keys(params).length !== 0) {

    // check if params is one of allowed
    const allowedParams = validator.allowedRecipesParams()
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

export const getRecipe = async (id: number): Promise<HttpResponse> => {

  const data: RecipeModel | Messages = await RecipesRepository.getRecipe(id)

  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()
  if (data === Messages.NOT_FOUND) return response.notFound(Messages.RECIPE_ID_NOT_FOUND)

  return response.ok(data)
}

export const createRecipe = async (body: object): Promise<HttpResponse> => {
  if (!isRecipeModel(body)) return response.badRequest(Messages.INVALID_OR_MISSING_PROPERTIES)

  const data = await RecipesRepository.addNewRecipe(body)

  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()

  return response.ok(body)
}

export const updateRecipe = async (id: any, body: any): Promise<HttpResponse> => {
  id = parseInt(id)

  const allowedProperties = validator.getRecipeModelKeys() // ['id', 'name','ingredients', 'steps','type', 'time','difficulty', 'category','ratings']
  const bodyProperties = Object.keys(body) // [ 'ingredients', 'steps' ]
  const extraProperties = bodyProperties.filter(property => !allowedProperties.includes(property)) // no extra: [] => extra: [ 'stepas' ]

  // check if theres extra properties
  if (extraProperties.length > 0) return response.badRequest(Messages.INVALID_PROPERTIES)

  const data: any = await RecipesRepository.getRecipesList()
  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()


  const foundRecipe = data.find((recipe: RecipeModel) => recipe.id === id)
  if (!foundRecipe) return response.notFound(Messages.RECIPE_ID_NOT_FOUND)

  // Update the foundRecipe object with values from the body object
  for (const key of bodyProperties) {
    if (body[key] !== undefined) {
      foundRecipe[key] = body[key]
    }
  }

  // Save the updated recipe
  const updateResult = await RecipesRepository.updateRecipe(data)
  if (updateResult === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()

  const returnData = {
    message: Messages.RECIPE_UPDATED_SUCCESSFULLY,
    recipe: foundRecipe
  }
  return response.ok(returnData)
}