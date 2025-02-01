import { HttpResponse } from "../models/http-response-model"
import { RatingModel } from "../models/rating-model"
import { RecipeModel } from "../models/recipe-model"
import * as RecipesRepository from "../repositories/recipes-repository"
import * as response from "../utils/http-response-helper"
import { HttpStatusMessage as Messages } from "../utils/http-response-helper"
import * as RatingValidator from "../validators/rating-validator"
import * as RecipeValidator from "../validators/recipe-validator"
import { buildRecipeQuery } from "./utils/queries/build-recipe-query"

export const listRecipes = async (params: object): Promise<HttpResponse> => {

  let data: RecipeModel[] | Messages
  // QUERY PARAMS
  if (Object.keys(params).length !== 0) {

    // check if params is one of allowed
    const allowedParams = RecipeValidator.allowedRecipesParams
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

export const getRecipe = async (id: any): Promise<HttpResponse> => {
  id = parseInt(id)
  const data: RecipeModel | Messages = await RecipesRepository.getRecipe(id)

  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()
  if (data === Messages.NOT_FOUND) return response.notFound(Messages.RECIPE_ID_NOT_FOUND)

  return response.ok(data)
}

export const createRecipe = async (body: object): Promise<HttpResponse> => {
  if (!RecipeValidator.isRecipeModel(body)) return response.badRequest(Messages.INVALID_OR_MISSING_PROPERTIES)

  const data = await RecipesRepository.addNewRecipe(body)

  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()

  return response.ok(data)
}

export const updateRecipe = async (id: any, body: any): Promise<HttpResponse> => {
  id = parseInt(id)

  const allowedProperties = RecipeValidator.recipeModelProperties // ['id', 'name','ingredients', 'steps','type', 'time','difficulty', 'category','ratings']
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

export const deleteRecipe = async (id: any): Promise<HttpResponse> => {
  id = parseInt(id)
  const data = await RecipesRepository.removeRecipe(id)

  if (data === Messages.RECIPE_ID_NOT_FOUND) return response.notFound(Messages.RECIPE_ID_NOT_FOUND)

  const returnData = {
    message: Messages.RECIPE_DELETED_SUCCESSFULLY
  }
  return response.ok(returnData)
}

export const createRecipeRating = async (id: any, body: RatingModel): Promise<HttpResponse> => {
  id = parseInt(id)

  // check if body is a Rating Model
  if (!RatingValidator.isRatingModel(body)) return response.badRequest(Messages.INVALID_OR_MISSING_PROPERTIES)

  // check for extra properties
  const allowedProperties = RatingValidator.ratingModelProperties
  const bodyProperties = Object.keys(body)
  const extraProperties = bodyProperties.filter((property: string) => !allowedProperties.includes(property))
  if (extraProperties.length > 0) return response.badRequest(Messages.INVALID_PROPERTIES)

  // get database
  const data = await RecipesRepository.getRecipesList()
  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()
  const foundRecipe = data.find((recipe: RecipeModel) => recipe.id === id)
  if (!foundRecipe) return response.notFound(Messages.RECIPE_ID_NOT_FOUND)

  // check if foundRecipe has any rating and if the body rate ID is one of the list
  const rates = foundRecipe.ratings ? foundRecipe.ratings : []
  const alreadyHaveRatingForThisUser = (rates.length > 0 && rates.some((r: RatingModel) => r.userId === body.userId))
  if (alreadyHaveRatingForThisUser) return response.badRequest(Messages.RATING_EXISTS_FOR_THIS_USER)

  // commit rating
  foundRecipe.ratings.push(body)
  const saved = await RecipesRepository.updateRecipe(data)
  if (saved === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()

  const returnData = {
    message: Messages.RATING_ADDED_SUCCESSFULLY,
    recipeId: foundRecipe.id,
    rating: body
  }

  return response.ok(returnData)
}