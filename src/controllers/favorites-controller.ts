import { Request, Response } from "express"
import { HttpResponse } from "../models/http-response-model"
import * as FavoritesService from "../services/favorites-service"

export const listFavoritesByUserId = async (req: Request, res: Response) => {

  const httpResponse: HttpResponse = await FavoritesService.listFavoritesByUserId(req.query)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}

export const saveFavorite = async (req: Request, res: Response) => {
  const httpResponse: HttpResponse = await FavoritesService.saveFavorite(req.body)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}