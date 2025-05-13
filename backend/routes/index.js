const express = require('express')

const { authRouter } = require('@/modules/auth/routes/authRoutes')
const { userRouter } = require('@/modules/users/routes/userRoutes')

const mainRouter = express.Router()

// Centrally connect routes for all modules
mainRouter.use('/auth', authRouter)
mainRouter.use('/users', userRouter)

module.exports = { mainRouter }
