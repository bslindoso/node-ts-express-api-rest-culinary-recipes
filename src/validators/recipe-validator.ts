import { RecipeModel } from "../models/recipe-model"

export const isRecipeModel = (obj: any): obj is RecipeModel => {

  return !!obj.name && typeof obj.name === 'string'
    && !!obj.ingredients && typeof obj.ingredients === 'object'
    && !!obj.steps && typeof obj.steps === 'object'
    && !!obj.type && typeof obj.type === 'string'
    && !!obj.time && typeof obj.time === 'string'
    && !!obj.difficulty && typeof obj.difficulty === 'string'
    && !!obj.category && typeof obj.category === 'string'
}

// export const gerRecipeModelKeys = () => {
//   return ['id', 'name', 'ingredients', 'steps', 'type', 'time', 'difficulty', 'category', 'ratings']
// }