const fs = require('fs')
const path = require('path')
const { Op } = require('sequelize')
const { User, Role, Position } = require('@/database/modelsInit')
const ApiError = require('@/utils/errorHandler')

const { generateOtp } = require('@/modules/auth/service/authService')
const { sendRegistrationEmail } = require('@/modules/mailer/service/mailerService')

const createUserService = async (firstName, lastName, birthDate, email, phone, address, roleId, positionId, avatarFile, avatarUrl) => {
	// Check if the user exists
	const candidate = await User.findOne({ where: { email } })
	if (candidate) {
		throw ApiError.badRequest('User with this email already exists')
	}

	// Create a user (temporarily without an avatar)
	const user = await User.create({
		firstName,
		lastName,
		birthDate,
		email,
		phone,
		address,
		roleId,
		positionId,
		avatar: '',
	})

	// Process the avatar
	let avatarPath = avatarUrl // By default, we take the URL

	if (avatarFile) {
		// Create a folder for the user `/uploads/{userId}/`
		const userFolder = path.join(__dirname, '../../../uploads', String(user.id))
		if (!fs.existsSync(userFolder)) {
			fs.mkdirSync(userFolder, { recursive: true })
		}

		// Save the file to the user folder
		avatarPath = `/uploads/${user.id}/${Date.now()}_${avatarFile.originalname}`
		const filePath = path.join(userFolder, `${Date.now()}_${avatarFile.originalname}`)
		fs.writeFileSync(filePath, avatarFile.buffer)
	}

	// Updating the user with the correct avatar
	await user.update({ avatar: avatarPath })

	// Generate an OTP code and send an email
	const otp = await generateOtp(user.id, 'activate')
	await sendRegistrationEmail(email, firstName, lastName, otp)

	return { message: 'User created successfully' }
}

const getAllUsersService = async (userId) => {
	const users = await User.findAll({
		where: {
			id: { [Op.ne]: userId },
		},
		attributes: { exclude: ['password'] },
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

	return users.map((user) => ({
		...user.toJSON(),
		position: user.position.name,
		role: user.role.name,
	}))
}

const getUserByIdService = async (userId) => {
	const user = await User.findByPk(userId, {
		attributes: { exclude: ['password'] },
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

	if (!user) {
		throw ApiError.notFound('User not found')
	}

	return {
		...user.toJSON(),
		position: user.position.name,
		role: user.role.name,
	}
}

const updateUserService = async (userId, updateData, avatarFile, avatarUrl) => {
	// Find the user
	const user = await User.findByPk(userId)

	if (!user) {
		throw ApiError.notFound('User not found')
	}

	// Check email uniqueness if changed
	if (updateData.email && updateData.email !== user.email) {
		const existingUser = await User.findOne({ where: { email: updateData.email } })
		if (existingUser) {
			throw ApiError.badRequest('Email is already in use')
		}
	}

	let avatarPath = avatarUrl || user.avatar

	// If the user wants to reset to the default avatar:
	const isDefaultAvatar = avatarUrl?.startsWith('/public/avatars/')

	// If new avatar file is provided OR switching to default avatar - delete old one
	if (avatarFile || isDefaultAvatar) {
		if (user.avatar && !user.avatar.startsWith('/public/avatars/')) {
			try {
				const oldFilePath = path.join(__dirname, '../../../', user.avatar)
				if (fs.existsSync(oldFilePath)) {
					fs.unlinkSync(oldFilePath)
				}
			} catch (error) {
				console.log(`Error deleting old avatar: ${error.message}`)
			}
		}
	}

	// If new avatar file is provided - save it
	if (avatarFile) {
		const userFolder = path.join(__dirname, '../../../uploads', String(user.id))

		// Ensure folder exists
		if (!fs.existsSync(userFolder)) {
			fs.mkdirSync(userFolder, { recursive: true })
		}

		// Generate unique filename
		const newAvatarName = `${Date.now()}_${avatarFile.originalname}`
		avatarPath = `/uploads/${user.id}/${newAvatarName}`
		const filePath = path.join(userFolder, newAvatarName)

		// Save the new file
		fs.writeFileSync(filePath, avatarFile.buffer)
	}

	// Update user record
	await user.update({
		...updateData,
		avatar: avatarPath, // Save new avatar path
	})

	return { message: 'User updated successfully' }
}

const deleteUserService = async (userId) => {
	const user = await User.findByPk(userId)

	if (!user) {
		throw ApiError.notFound('User not found')
	}

	await user.destroy()

	const userFolder = path.join(__dirname, '../../../uploads', String(userId))
	try {
		if (fs.existsSync(userFolder)) {
			await fs.promises.rm(userFolder, { recursive: true, force: true })
		}
	} catch (error) {
		console.log(`Error deleting user folder: ${error.message}`)
	}

	return { message: 'User deleted successfully' }
}
const getAllRoles = async () => {
	const roles = await Role.findAll({
		attributes: ['id', 'name'],
	})

	return roles
}

const getAllPositions = async () => {
	const positions = await Position.findAll({
		attributes: ['id', 'name'],
	})

	return positions
}
module.exports = { createUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService, getAllRoles, getAllPositions }
