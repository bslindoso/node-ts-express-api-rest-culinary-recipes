export interface RecipeModel {
  id: number,
  name: string,
  ingredients: string[],
  steps: string[],
  type: string,
  time: string,
  difficulty: string,
  category: string,
  ratings: []

}