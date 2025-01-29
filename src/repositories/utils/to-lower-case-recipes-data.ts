import { RecipeModel } from "../../models/recipe-model";

/**
 * Converts all string fields in an array of recipes to lowercase
 * @param database Array of RecipeModel objects containing recipe data
 * @returns New array of recipes with all string fields converted to lowercase
 */
export const toLowerCaseRecipesData = (database: RecipeModel[]) => {
  const recipes = database.map((recipe: RecipeModel) => ({
    ...recipe,
    name: recipe.name.toLowerCase(),
    ingredients: recipe.ingredients.map(ing => ing.toLowerCase()),
    steps: recipe.steps.map(stp => stp.toLowerCase()),
    type: recipe.type.toLowerCase(),
    difficulty: recipe.difficulty.toLowerCase(),
    category: recipe.category.toLowerCase()
  }))

  return recipes
}