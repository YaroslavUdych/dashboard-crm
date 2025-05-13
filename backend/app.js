require('module-alias/register')
const { errorMiddleware } = require('./middlewares/errorMiddleware')

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { corsOptions } = require('./config/cors')
const { mainRouter } = require('./routes/index')

const APP = express()

APP.use(cors(corsOptions))
APP.use(cookieParser())
APP.use(express.json())
APP.use('/api', mainRouter)
APP.use(errorMiddleware)

module.exports = { APP }
