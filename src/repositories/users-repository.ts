import fs from "fs"
import path from "path"
import { HttpStatusMessage as Messages } from "../utils/http-response-helper"

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

export const getUsersList = async () => {
  return await readFile()
}

export const getUser = async () => {

}