const jwt = require('jsonwebtoken')
const { RefreshToken } = require('@/database/modelsInit')

const generateTokens = (userId) => {
	const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
	const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

	return { accessToken, refreshToken }
}

const saveRefreshToken = async (userId, refreshToken) => {
	const refreshTokenData = await RefreshToken.findOne({ where: { userId } })
	if (refreshTokenData) {
		refreshTokenData.refreshToken = refreshToken
		await refreshTokenData.save()
	} else {
		await RefreshToken.create({ userId, refreshToken })
	}

	return refreshToken
}

const removeRefreshToken = async (refreshToken) => {
	await RefreshToken.destroy({ where: { refreshToken } })
}

module.exports = { generateTokens, saveRefreshToken, removeRefreshToken }
