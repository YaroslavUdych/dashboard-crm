const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('@/utils/errorHandler')

const { OtpCode, User, RefreshToken, Role, Position } = require('@/database/modelsInit')
const { generateTokens, saveRefreshToken, removeRefreshToken } = require('../service/tokenService')
const { sendForgotPasswordEmail } = require('@/modules/mailer/service/mailerService')

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12

const generateOtp = async (userId, type) => {
	const otp = Math.floor(1000 + Math.random() * 9000).toString()

	const expiresAt = new Date(Date.now() + (type === 'activate' ? 60 * 60 * 1000 : 5 * 60 * 1000)) // 🔥 1 година для активації, 5 хв для forgotPass

	await OtpCode.upsert({ userId, otp, type, expiresAt })

	return otp
}

const verifyOtpService = async (otp) => {
	const record = await OtpCode.findOne({ where: { otp } })

	if (!record) {
		throw ApiError.badRequest('Invalid code')
	}

	if (new Date() > record.expiresAt) {
		throw ApiError.badRequest('Code has expired')
	}

	return { userId: record.userId, type: record.type }
}

const setPasswordService = async (userId, password, type) => {
	const validTypes = ['activate', 'forgotPassword']
	if (!validTypes.includes(type)) {
		throw ApiError.badRequest('Invalid OTP type')
	}

	const user = await User.findOne({ where: { id: userId } })
	if (!user) {
		throw ApiError.badRequest('User not found')
	}

	// 🔥 Перевіряємо тип OTP-коду
	const otpRecord = await OtpCode.findOne({ where: { userId, type } })
	if (!otpRecord) {
		throw ApiError.badRequest('Password has already been set. Please log in.')
	}

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

	// 🔥 Якщо це активація → активуємо акаунт
	const isActivated = type === 'activate' ? true : user.isActivated

	await User.update({ password: hashedPassword, isActivated }, { where: { id: userId } })

	// 🔥 Видаляємо OTP-код після використання
	await OtpCode.destroy({ where: { userId, type } })

	return { success: true, message: 'Password set successfully. You can now log in.' }
}

const forgotPasswordService = async (email) => {
	const user = await User.findOne({ where: { email } })

	if (!user) {
		throw ApiError.badRequest('User with this email does not exist')
	}

	const otp = await generateOtp(user.id, 'forgotPassword')

	await sendForgotPasswordEmail(email, user.firstName, user.lastName, otp)

	return { message: 'OTP sent to email' }
}

const loginService = async (email, password) => {
	const user = await User.findOne({ where: { email } })

	if (!user) {
		throw ApiError.badRequest('User with this email does not exist')
	}

	const match = await bcrypt.compare(password, user.password)

	if (!match) {
		throw ApiError.badRequest('Invalid password')
	}

	const userData = await User.findOne({
		where: { email },
		attributes: {
			exclude: ['password', 'roleId', 'positionId', 'createdAt', 'updatedAt', 'isActivated'],
		},
		include: [
			{
				model: Role,
				as: 'role',
				attributes: ['name'],
			},
			{
				model: Position,
				as: 'position',
				attributes: ['name'],
			},
		],
	})

	const { accessToken, refreshToken } = generateTokens(user.id)

	await saveRefreshToken(user.id, refreshToken)

	return { userData, accessToken, refreshToken }
}

const logoutService = async (refreshToken) => {
	await removeRefreshToken(refreshToken)
}

const refreshTokenService = async (refreshToken) => {
	if (!refreshToken) {
		throw ApiError.unauthorized('No refresh token provided')
	}
	const storedToken = await RefreshToken.findOne({ where: { refreshToken } })
	if (!storedToken) {
		throw ApiError.unauthorized('Invalid refresh token')
	}

	let payload
	try {
		payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
	} catch (error) {
		throw ApiError.unauthorized('Expired or invalid refresh token')
	}

	const user = await User.findOne({ where: { id: payload.id } })
	if (!user) {
		throw ApiError.unauthorized('User not found')
	}

	const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id)

	await saveRefreshToken(user.id, newRefreshToken)

	return { accessToken, refreshToken: newRefreshToken }
}

module.exports = { generateOtp, verifyOtpService, setPasswordService, loginService, forgotPasswordService, logoutService, refreshTokenService }
