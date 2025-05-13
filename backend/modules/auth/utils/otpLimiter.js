const rateLimit = require('express-rate-limit')

const otpLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 🔥 10 хвилин
	max: 5, // 🔥 5 спроб
	message: 'Too many attempts, please try again later',
})

module.exports = { otpLimiter }
