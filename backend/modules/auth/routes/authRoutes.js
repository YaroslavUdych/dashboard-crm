const Router = require('express').Router
const { otpLimiter } = require('../utils/otpLimiter')

const { verifyOtp, login, logout, refreshToken, forgotPassword, setPassword } = require('../controllers/authController')

const { validateRequest } = require('@/middlewares/validationMiddleware')
const { verifyOtpValidator, setPasswordValidator, forgotPasswordValidator, loginValidator } = require('../validators/authValidator')

const authRouter = Router()

authRouter.post('/verify', otpLimiter, verifyOtpValidator, validateRequest, verifyOtp)
authRouter.post('/set-password', setPasswordValidator, validateRequest, setPassword)
authRouter.post('/login', loginValidator, validateRequest, login)
authRouter.post('/logout', logout)
authRouter.post('/refresh', refreshToken)
authRouter.post('/forgot-password', forgotPasswordValidator, validateRequest, forgotPassword)
module.exports = { authRouter }
