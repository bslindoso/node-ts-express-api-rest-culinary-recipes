import { HttpResponse } from "../models/http-response-model"
import { RecipeModel } from "../models/recipe-model"
import * as RecipesRepository from "../repositories/recipes-repository"
import * as httpResponse from "../utils/http-response-helper"
import allowedRecipesParams from "./utils/allowed-recipes-params"

export const listRecipes = async (params: object): Promise<HttpResponse> => {

  let data: RecipeModel[]

  // verify if has query params
  if (Object.keys(params).length !== 0) {
    // check if params is one of allowed
    const allowedParams = allowedRecipesParams()
    const hasInvalidParams = Object.keys(params).some(param => !allowedParams.includes(param))
    if (hasInvalidParams) {
      return httpResponse.badRequest("One or more parameters are invalid.")
    }
    // build json-query
    // const buildQuery = (params: object) => {
    //   const conditions = Object.entries(params)
    //     .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
    //     .join(' & ') // Usa & para combinar múltiplos critérios
    //   return `[${conditions}]`
    // }
    const buildQuery = (params: object) => {
      const conditions = Object.entries(params).map(([key, value]) => {
        if (key === "ingredients") {
          return `ingredients[*]=${JSON.stringify(value)}` // Para arrays
        }
        return `${key}=${JSON.stringify(value)}` // Para strings normais
      }).join(" & ") // Une as condições com '&'

      return conditions ? `[${conditions}]` : "" // Retorna uma query válida
    }
    const query = buildQuery(params)

    console.log(query)

    data = await RecipesRepository.getRecipesList(query)
  } else {
    data = await RecipesRepository.getRecipesList()
  }

  return httpResponse.ok(data)
}