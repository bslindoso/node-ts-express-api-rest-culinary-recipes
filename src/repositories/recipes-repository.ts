import path from "path"
import fs from 'fs'
import { RecipeModel } from "../models/recipe-model"
import jsonQuery from 'json-query'

const readFile = async () => {
  const fileName = 'recipes.json'
  const filePath = path.join(__dirname, '..', 'data', fileName)
  const language = 'utf-8'

  return fs.readFileSync(filePath, language)
}


export const getRecipesList = async (query?: string): Promise<RecipeModel[]> => {
  let database = await readFile()
  // console.log(database)

  if (query) {
    // return query
    // return jsonQuery(`recipes${query}`, { data: database }).value
    database = jsonQuery(`recipes[name="Panqueca de Banana"]`, { data: database }).value
    console.log(database)
  }
  return JSON.parse(database)
}

