const {
	verifyOtpService,
	setPasswordService,
	loginService,
	forgotPasswordService,
	logoutService,
	refreshTokenService,
} = require('../service/authService')

const verifyOtp = async (req, res, next) => {
	try {
		const { otp } = req.body

		const { userId, type } = await verifyOtpService(otp)

		res.json({ userId, type })
	} catch (error) {
		next(error)
	}
}

const setPassword = async (req, res, next) => {
	try {
		const { userId, password, type } = req.body

		const response = await setPasswordService(userId, password, type)

		res.json(response)
	} catch (error) {
		next(error)
	}
}

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const { userData, accessToken, refreshToken } = await loginService(email, password)

		res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

		res.status(200).json({ user: userData, accessToken: accessToken })
	} catch (error) {
		next(error)
	}
}

const logout = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies

		await logoutService(refreshToken)
		res.clearCookie('refreshToken')

		res.json({ success: true })
	} catch (error) {
		next(error)
	}
}

const refreshToken = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies

		const { accessToken, refreshToken: newRefreshToken } = await refreshTokenService(refreshToken)

		res.cookie('refreshToken', newRefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

		res.json({ accessToken: accessToken })
	} catch (error) {
		next(error)
	}
}

const forgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body

		const { message } = await forgotPasswordService(email)

		res.json({ message })
	} catch (error) {
		next(error)
	}
}

module.exports = { verifyOtp, login, logout, refreshToken, forgotPassword, setPassword }
