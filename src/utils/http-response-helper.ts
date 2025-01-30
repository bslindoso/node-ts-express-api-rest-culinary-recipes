import { HttpResponse } from "../models/http-response-model";
import { StatusCode } from "./status-code";

// HTTP RESPONSES
export const ok = (data?: any): HttpResponse => {
  return {
    statuscode: StatusCode.OK,
    body: (data) ? data : { message: HttpStatusMessage.OK }
  }
}

export const notFound = (message?: string): HttpResponse => {
  return {
    statuscode: StatusCode.NOT_FOUND,
    body: (message) ? { message: message } : { message: HttpStatusMessage.NOT_FOUND }
  }
}

export const badRequest = (message?: string): HttpResponse => {
  return {
    statuscode: StatusCode.BAD_REQUEST,
    body: (message) ? { message: message } : { message: HttpStatusMessage.BAD_REQUEST }
  }
}

export const internalServerError = (message?: string): HttpResponse => {
  return {
    statuscode: StatusCode.INTERNAL_SERVER_ERROR,
    body: (message) ? { message: message } : { message: HttpStatusMessage.INTERNAL_SERVER_ERROR }
  }
}


// MESSAGES
export enum HttpStatusMessage {
  OK = "Success",
  BAD_REQUEST = "Bad request",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  INVALID_PROPERTIES = "One or more properties are invalid",
  INVALID_OR_MISSING_PROPERTIES = "One or more properties are invalid or missing",
  NOT_FOUND = "Not found",
  INVALID_PARAMETERS = "One or more parameters are invalid",
  RECIPE_ID_NOT_FOUND = "Recipe ID not found",
  RECIPE_UPDATED_SUCCESSFULLY = "Recipe updated successfully"
}
