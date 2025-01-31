import { RatingModel } from "./rating-model";

export interface RecipeModel {
  [key: string]: any,
  id: number,
  name: string,
  ingredients: string[],
  steps: string[],
  type: string,
  time: string,
  difficulty: string,
  category: string,
  ratings: RatingModel[]
}