import { Router } from "express";
import * as RecipesController from "./controllers/recipes-controller";

export const router = Router()

router.get('/recipes', RecipesController.listRecipes)