const { body, param } = require('express-validator')

const verifyOtpValidator = [
	body('otp')
		.exists()
		.withMessage('OTP is required')
		.isString()
		.withMessage('OTP must be a string')
		.isLength({ min: 4, max: 4 })
		.withMessage('OTP must be 4 characters'),
]

const setPasswordValidator = [
	body('userId').exists().withMessage('User ID is required').isInt().withMessage('User ID must be an integer'),

	body('password')
		.exists()
		.withMessage('Password is required')
		.isString()
		.withMessage('Password must be a string')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),

	body('type')
		.exists()
		.withMessage('Type is required')
		.isString()
		.withMessage('Type must be a string')
		.isIn(['activate', 'forgotPassword'])
		.withMessage('Invalid type of OTP code'),
]

const loginValidator = [
	body('email').exists().withMessage('Email is required').isEmail().withMessage('Invalid email'),

	body('password')
		.exists()
		.withMessage('Password is required')
		.isString()
		.withMessage('Password must be a string')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
]

const forgotPasswordValidator = [body('email').exists().withMessage('Email is required').isEmail().withMessage('Invalid email')]

module.exports = { verifyOtpValidator, setPasswordValidator, forgotPasswordValidator, loginValidator }
