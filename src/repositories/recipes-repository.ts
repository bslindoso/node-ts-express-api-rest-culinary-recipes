import path from "path"
import fs from 'fs'
import { RecipeModel } from "../models/recipe-model"

const readFile = async () => {
  const fileName = 'recipes.json'
  const filePath = path.join(__dirname, '..', 'data', fileName)
  const language = 'utf-8'

  return fs.readFileSync(filePath, language)
}


export const getRecipesList = async (): Promise<RecipeModel[]> => {
  return JSON.parse(await readFile())
}

