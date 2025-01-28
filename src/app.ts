import express from 'express'
import cors from 'cors'
import { router } from './routes'

export const createApp = () => {
  const app = express()

  app.use(express.json())
  app.use('/', router)

  app.use(cors())

  return app
} 