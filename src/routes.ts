import { Router } from "express";
import * as RecipesController from "./controllers/recipes-controller";
import * as UsersController from "./controllers/users-controller"

export const router = Router()

// Recipes
router.get('/recipes', RecipesController.listRecipes)
router.get('/recipes/:id', RecipesController.getRecipe)
router.post('/recipes', RecipesController.createRecipe)
router.patch('/recipes/:id', RecipesController.updateRecipe)
router.delete('/recipes/:id', RecipesController.deleteRecipe)
router.post('/recipes/:id/ratings', RecipesController.createRecipeRating)

// Users
router.get('/users', UsersController.listUsers)
router.get('/users/:id', UsersController.getUser)