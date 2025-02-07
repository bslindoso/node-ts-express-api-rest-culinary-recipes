import { HttpResponse } from "../models/http-response-model";
import * as response from "../utils/http-response-helper"
import { HttpStatusMessage as Messages } from "../utils/http-response-helper";
import * as UserRepository from "../repositories/users-repository"
import { UserModel } from "../models/user-model";
import * as RecipesRepository from "../repositories/recipes-repository"

export const listFavoritesByUserId = async (query: any): Promise<HttpResponse> => {

  const queryKeys = Object.keys(query)
  if (queryKeys.length > 1) return response.badRequest(Messages.INVALID_PARAMETERS)

  if (!query.userId) return response.badRequest(Messages.INVALID_PARAMETERS)

  const userId = Number(query.userId)

  if (Number.isNaN(userId)) return response.badRequest(Messages.FAVORITE_USERID_MUST_BE_A_NUMBER)

  // Get user by ID
  const user = await UserRepository.getUser(userId)
  if (user === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()
  if (user === Messages.NOT_FOUND) return response.notFound(Messages.USER_ID_NOT_FOUND)

  // Define Favorite's List
  const userFavorites = user.favorites
  if (!userFavorites || userFavorites.length === 0) return response.noContent()

  // Check for Recipes 
  console.log(userFavorites)
  const recipes = await Promise.all(userFavorites.map((id: number) => RecipesRepository.getRecipe(id)))

  return response.ok({
    userId: userId,
    recipes: recipes
  })
}

export const saveFavorite = async (body: any) => {

  // Check if body has userId and recipeId properties
  if (
    !body.userId ||
    typeof body.userId !== 'number' ||
    !body.recipeId ||
    typeof body.recipeId !== 'number' ||
    Object.keys(body).length >= 3
  ) return response.badRequest(Messages.INVALID_PROPERTIES)

  const userId: number = body.userId
  const recipeId: number = body.recipeId

  const user = await UserRepository.getUser(userId)
  if (user === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()
  if (user === Messages.NOT_FOUND) return response.notFound(Messages.USER_ID_NOT_FOUND)

  // UPDATE USER FAVORITES (CREATE REPOSITORY updateUser)
  user.favorites?.push(recipeId)
  console.log(user)



  return response.ok()
}