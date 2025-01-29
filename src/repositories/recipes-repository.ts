import path from "path"
import fs from 'fs'
import { RecipeModel } from "../models/recipe-model"
import jsonQuery from 'json-query'
import { toLowerCaseRecipesData } from "./utils/to-lower-case-recipes-data"

const readFile = async () => {
  const fileName = 'recipes.json'
  const filePath = path.join(__dirname, '..', 'data', fileName)
  const language = 'utf-8'

  return fs.readFileSync(filePath, language)
}

export const getRecipesList = async (query?: string): Promise<RecipeModel[]> => {
  const database = JSON.parse(await readFile())
  let result = database

  if (query) {
    // Transform all scrings in database to easily matches (no case sensitives)
    const database_lowerCase = toLowerCaseRecipesData(database)
    // Search query in database_lowercase, but return only matches IDs
    let foundRecipesIdList = (jsonQuery(`${query}`, { data: database_lowerCase }).value).map((f: RecipeModel) => f.id)
    // Filter the original database keeping only elements whose IDs are in recipesFoundIdList    
    result = database.filter((item: RecipeModel) => foundRecipesIdList.includes(item.id))
  }

  return result
}

