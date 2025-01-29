import { HttpResponse } from "../models/http-response-model";
import { StatusCode } from "./status-code";

export const ok = (data: object): HttpResponse => {
  return {
    statuscode: StatusCode.OK,
    body: data
  }
}