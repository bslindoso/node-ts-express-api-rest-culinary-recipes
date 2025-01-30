import path from "path"
import fs from 'fs'
import { RecipeModel } from "../models/recipe-model"
import jsonQuery from 'json-query'
import { toLowerCaseRecipesData } from "./utils/to-lower-case-recipes-data"
import { HttpStatusMessage as Messages } from "../utils/http-response-helper"

const LANGUAGE = 'utf-8'
const FILE_NAME = 'recipes.json'
const FILE_PATH = path.join(__dirname, '..', 'data', FILE_NAME)

const readFile = async () => {
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, LANGUAGE))
  } catch (error) {
    console.log(`Failed to read the file in ${FILE_PATH}`)
    return false
  }
}

const saveOnFile = async (data: object) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data), LANGUAGE)
    return true
  } catch (error) {
    console.log(`Failed to save to the file in ${FILE_PATH}`)
    return false
  }
}

export const getRecipesList = async (query?: string): Promise<RecipeModel[] | Messages> => {
  const data = await readFile()
  if (!data) return Messages.INTERNAL_SERVER_ERROR

  let foundRecipes = data

  if (query) {
    // Transform all scrings in database to easily matches (no case sensitives)
    const database_lowerCase = toLowerCaseRecipesData(data)
    // Search query in database_lowercase, but return only matches IDs
    let foundRecipesIdList = (jsonQuery(`${query}`, { data: database_lowerCase }).value).map((f: RecipeModel) => f.id)
    // Filter the original database keeping only elements whose IDs are in recipesFoundIdList    
    foundRecipes = data.filter((item: RecipeModel) => foundRecipesIdList.includes(item.id))
  }

  return foundRecipes
}

export const getRecipe = async (id: number): Promise<RecipeModel | Messages> => {

  const data = await readFile()

  if (!data) return Messages.INTERNAL_SERVER_ERROR

  const foundRecipe = data.find((recipe: RecipeModel) => recipe.id === id)
  if (!foundRecipe) return Messages.NOT_FOUND

  return foundRecipe
}

export const addNewRecipe = async (recipe: RecipeModel): Promise<number | Messages> => {
  const data = await readFile()
  if (!data) return Messages.INTERNAL_SERVER_ERROR

  const dataIDsList = data.map((d: RecipeModel) => d.id)
  const lastDataId = Math.max(...dataIDsList)
  const nextIndex = (data.length > 0) ? lastDataId + 1 : 1

  const { id, ...recipeNoID } = recipe

  data.push({
    id: nextIndex,
    ...recipeNoID
  })

  const isSavedSuccessfully = await saveOnFile(data)
  if (!isSavedSuccessfully) return Messages.INTERNAL_SERVER_ERROR

  return nextIndex
}

export const updateRecipe = async (recipe: object): Promise<Messages> => {
  const isSavedSuccessfully = await saveOnFile(recipe)
  if (!isSavedSuccessfully) return Messages.INTERNAL_SERVER_ERROR

  return Messages.OK
}

export const removeRecipe = async (id: number): Promise<RecipeModel | Messages> => {
  const data = await readFile()
  const foundId = data.findIndex((d: RecipeModel) => d.id === id)
  if (foundId !== -1) {

    const deletedData = data[foundId]
    data.splice(foundId, 1)
    saveOnFile(data)
    return deletedData

  } else {
    return Messages.RECIPE_ID_NOT_FOUND
  }
}