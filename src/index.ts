import express from 'express'
import os from 'os'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import { AppDataSource } from './data-source'
import errorMiddleware from './middlewares/error.middleware'
import router from './routes/index'

dotenv.config()

// establish database connection
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const port = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api', router)
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server running at http://${os.hostname()}:${port}/`)
  })