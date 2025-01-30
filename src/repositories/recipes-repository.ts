import path from "path"
import fs from 'fs'
import { RecipeModel } from "../models/recipe-model"
import jsonQuery from 'json-query'
import { toLowerCaseRecipesData } from "./utils/to-lower-case-recipes-data"
import { HttpStatusMessage } from "../utils/http-response-helper"

const LANGUAGE = 'utf-8'
const FILE_NAME = 'recipess.json'
const FILE_PATH = path.join(__dirname, '..', 'data', FILE_NAME)

const readFile = async () => {
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, LANGUAGE))
  } catch (error) {
    console.log(`Failed to read the file in ${FILE_PATH}`)
    return `error`
  }
}

const saveOnFile = async (database: object) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(database), LANGUAGE)
  } catch (error) {
    throw `Failed to save to the file in ${FILE_PATH}`
  }
}

export const getRecipesList = async (query?: string): Promise<RecipeModel[] | HttpStatusMessage> => {
  const database = await readFile()
  if (database === 'error') return HttpStatusMessage.INTERNAL_SERVER_ERROR
  let foundRecipes = database

  if (query) {
    // Transform all scrings in database to easily matches (no case sensitives)
    const database_lowerCase = toLowerCaseRecipesData(database)
    // Search query in database_lowercase, but return only matches IDs
    let foundRecipesIdList = (jsonQuery(`${query}`, { data: database_lowerCase }).value).map((f: RecipeModel) => f.id)
    // Filter the original database keeping only elements whose IDs are in recipesFoundIdList    
    foundRecipes = database.filter((item: RecipeModel) => foundRecipesIdList.includes(item.id))
  }

  return foundRecipes
}

export const getRecipeById = async (id: number): Promise<RecipeModel | HttpStatusMessage> => {

  const database = await readFile()
  if (database === 'error') return HttpStatusMessage.INTERNAL_SERVER_ERROR

  const foundRecipe: RecipeModel = database.find((recipe: RecipeModel) => recipe.id === id)

  return foundRecipe
}

export const addNewRecipe = async (recipe: RecipeModel) => {
  const database = await readFile()

}
