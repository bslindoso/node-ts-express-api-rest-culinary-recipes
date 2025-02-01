import fs from "fs"
import path from "path"
import { HttpStatusMessage as Messages } from "../utils/http-response-helper"
import { UserModel } from "../models/user-model"

const FILENAME = "users.json"
const FILEPATH = path.join(__dirname, "..", "/data/", FILENAME)
const LANGUAGE = 'utf-8'


const readFile = async () => {
  try {
    return JSON.parse(fs.readFileSync(FILEPATH, LANGUAGE))
  } catch (e) {
    return Messages.INTERNAL_SERVER_ERROR
  }
}

const saveOnFile = async () => {

}

export const getUsersList = async (): Promise<UserModel[] | Messages.INTERNAL_SERVER_ERROR> => {
  return await readFile()
}

export const getUser = async (id: number): Promise<UserModel | Messages.NOT_FOUND | Messages.INTERNAL_SERVER_ERROR> => {
  let data = await readFile()
  const foundUser: UserModel | undefined = data.find((user: UserModel) => user.id === id)
  if (!foundUser) return Messages.NOT_FOUND


  return foundUser
}