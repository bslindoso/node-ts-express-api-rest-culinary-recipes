import { Request, Response } from "express"
import { HttpResponse } from "../models/http-response-model"
import * as UsersService from "../services/users-service"

export const listUsers = async (req: Request, res: Response) => {

  const httpResponse: HttpResponse = await UsersService.listUsers()

  res.status(httpResponse.statuscode).json(httpResponse.body)
}

export const getUser = async (req: Request, res: Response) => {

  const httpResponse: HttpResponse = await UsersService.getUser(req.params.id)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}

export const registerUser = async (req: Request, res: Response) => {

  const httpResponse = await UsersService.registerUser(req.body)

  res.status(httpResponse.statuscode).json(httpResponse.body)
}