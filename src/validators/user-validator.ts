import { UserModel } from "../models/user-model"

export const isUserModel = (obj: any): obj is UserModel => {
  return !!obj.name && typeof obj.name === 'string'
    && !!obj.email && typeof obj.email === 'string'
}