import { HttpResponse } from "../models/http-response-model";
import { HttpStatusMessage as Messages } from "../utils/http-response-helper";
import * as response from "../utils/http-response-helper"
import * as UsersRepository from "../repositories/users-repository"
import * as validation from "../validators/user-validator"

export const listUsers = async (): Promise<HttpResponse> => {
  const data = await UsersRepository.getUsersList()
  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()

  return response.ok(data)
}

export const getUser = async (id: any): Promise<HttpResponse> => {
  id = parseInt(id)

  const data = await UsersRepository.getUser(id)
  if (data === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()
  if (data === Messages.NOT_FOUND) return response.notFound(Messages.USER_ID_NOT_FOUND)

  return response.ok(data)
}

export const registerUser = async (body: object) => {
  let newUser = (validation.isUserModel(body)) ? body : Messages.BAD_REQUEST
  if (newUser === Messages.BAD_REQUEST) return response.badRequest(Messages.INVALID_OR_MISSING_PROPERTIES)

  const registeredUser = await UsersRepository.saveUser(newUser)
  if (registeredUser === Messages.INTERNAL_SERVER_ERROR) return response.internalServerError()

  return response.ok({
    message: Messages.USER_REGISTERED_SUCCESSFULLY,
    user: registeredUser
  })
}