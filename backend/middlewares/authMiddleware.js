const jwt = require('jsonwebtoken')
const ApiError = require('@/utils/errorHandler')
const { User } = require('@/database/modelsInit')

const authMiddleware = async function (req, res, next) {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			throw ApiError.unauthorized('No token provided')
		}

		const token = authHeader.split(' ')[1]
		if (!token) {
			throw ApiError.unauthorized('No token provided')
		}

		const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

		const user = await User.findByPk(payload.id)

		if (!user) {
			throw ApiError.unauthorized('User not found')
		}

		req.user = payload
		next()
	} catch (error) {
		return next(ApiError.unauthorized('User is not authorized'))
	}
}

module.exports = { authMiddleware }
