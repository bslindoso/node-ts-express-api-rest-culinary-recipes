import { HttpResponse } from "../models/http-response-model";
import { StatusCode } from "./status-code";

// HTTP RESPONSES
export const ok = (data?: any): HttpResponse => {
  return {
    statuscode: StatusCode.OK,
    body: data ? data : { message: 'success' }
  }
}

export const badRequest = (message?: string): HttpResponse => {
  return {
    statuscode: StatusCode.BAD_REQUEST,
    body: (message) ? { message: message } : {}
  }
}

export const internalServerError = (message?: string): HttpResponse => {
  return {
    statuscode: StatusCode.INTERNAL_SERVER_ERROR,
    body: (message) ? { message: message } : {}
  }
}


// MESSAGES
export enum HttpStatusMessage {
  OK = "OK",
  CREATED = "Created",
  ACCEPTED = "Accepted",
  NO_CONTENT = "No Content",
  BAD_REQUEST = "Bad Request",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  NOT_FOUND = "Not Found",
  METHOD_NOT_ALLOWED = "Method Not Allowed",
  CONFLICT = "Conflict",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  NOT_IMPLEMENTED = "Not Implemented",
  BAD_GATEWAY = "Bad Gateway",
  SERVICE_UNAVAILABLE = "Service Unavailable",
  GATEWAY_TIMEOUT = "Gateway Timeout",
}
