import { HttpResponse } from "../models/http-response-model";
import * as response from "../utils/http-response-helper"
import * as UsersRepository from "../repositories/users-repository"

export const listUsers = async (): Promise<HttpResponse> => {
  const data = await UsersRepository.getUsersList()
  return response.ok(data)
}

export const getUser = async (id: string): Promise<HttpResponse> => {
  return response.ok()
}