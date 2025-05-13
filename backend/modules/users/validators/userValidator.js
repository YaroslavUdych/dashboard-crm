const { body, param } = require('express-validator')

const createUserValidation = [
	body('firstName')
		.exists()
		.withMessage('First name is required')
		.isString()
		.withMessage('First name must be a string')
		.trim()
		.isLength({ min: 2, max: 20 })
		.withMessage('First name must be between 2 and 20 characters'),

	body('lastName')
		.exists()
		.withMessage('Last name is required')
		.isString()
		.withMessage('Last name must be a string')
		.trim()
		.isLength({ min: 2, max: 20 })
		.withMessage('Last name must be between 2 and 20 characters'),

	body('birthDate').exists().withMessage('Birth date is required').isString().withMessage('Birth date must be a string').trim(),

	body('email').exists().withMessage('Email is required').trim().isEmail().withMessage('Invalid email format'),

	body('phone')
		.exists()
		.withMessage('Phone is required')
		.isString()
		.withMessage('Phone must be a string')
		.trim()
		.matches(/^\+\d{12}$/)
		.withMessage('Phone number must start with + and contain exactly 12 digits'),

	body('address')
		.exists()
		.withMessage('Address is required')
		.isString()
		.withMessage('Address must be a string')
		.trim()
		.isLength({ min: 3, max: 100 })
		.withMessage('Address must be between 3 and 100 characters'),

	body('roleId')
		.exists()
		.withMessage('roleId is required')
		.custom((value) => {
			if (typeof value === 'number') return true
			if (typeof value === 'string' && /^\d+$/.test(value)) return true
			throw new Error('roleId must be an integer')
		})
		.customSanitizer((value) => Number(value)),

	body('positionId')
		.exists()
		.withMessage('positionId is required')
		.custom((value) => {
			if (typeof value === 'number') return true
			if (typeof value === 'string' && /^\d+$/.test(value)) return true
			throw new Error('positionId must be an integer')
		})
		.customSanitizer((value) => Number(value)),

	body('avatar'),
]

const getUserByIdValidation = [
	param('id')
		.exists()
		.withMessage('User id is required')
		.custom((value) => {
			if (typeof value === 'number') return true
			if (typeof value === 'string' && /^\d+$/.test(value)) return true
			throw new Error('userId must be an integer')
		})
		.customSanitizer((value) => Number(value)),
]

const updateUserValidation = [
	param('id')
		.exists()
		.withMessage('User id is required')
		.custom((value) => {
			if (typeof value === 'number') return true
			if (typeof value === 'string' && /^\d+$/.test(value)) return true
			throw new Error('id must be an integer')
		})
		.customSanitizer((value) => Number(value)),
	body('firstName').optional().isString().isLength({ min: 3, max: 50 }).withMessage('First name must be between 3 and 50 characters'),
	body('lastName').optional().isString().isLength({ min: 3, max: 50 }).withMessage('Last name must be between 3 and 50 characters'),
	body('birthDate').optional().isString().withMessage('Birth date is required'),
	body('email').optional().isEmail().withMessage('Invalid email format'),
	body('phone')
		.optional()
		.isString()
		.withMessage('Phone must be a string')
		.matches(/^\+\d{12}$/)
		.withMessage('Phone number must start with + and contain exactly 12 digits'),
	body('address').optional().isString().isLength({ min: 3, max: 100 }).withMessage('Address must be between 3 and 100 characters'),
	body('roleId').optional().isInt().withMessage('Role ID must be an integer'),
	body('positionId').optional().isInt().withMessage('Position ID must be an integer'),
	body('avatar').optional(),
]

const deleteUserValidation = [param('id').exists().withMessage('User id is required').isInt().withMessage('User ID must be an integer')]

module.exports = { createUserValidation, getUserByIdValidation, updateUserValidation, deleteUserValidation }
