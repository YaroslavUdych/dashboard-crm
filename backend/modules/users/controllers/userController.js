const {
	getAllUsersService,
	getUserByIdService,
	createUserService,
	updateUserService,
	deleteUserService,
	getAllRoles,
	getAllPositions,
} = require('../service/userService')

const getUsers = async (req, res, next) => {
	try {
		const currentUserId = req.user.id
		const users = await getAllUsersService(currentUserId)

		res.status(200).json(users)
	} catch (error) {
		next(error)
	}
}

const getUserById = async (req, res, next) => {
	try {
		const userId = req.params.id
		const user = await getUserByIdService(userId)

		res.status(200).json(user)
	} catch (error) {
		next(error)
	}
}

const createUser = async (req, res, next) => {
	try {
		const { firstName, lastName, birthDate, email, phone, address, roleId, positionId, avatar } = req.body
		const avatarFile = req.file

		const { message } = await createUserService(firstName, lastName, birthDate, email, phone, address, roleId, positionId, avatarFile, avatar)

		res.status(201).json({ message })
	} catch (error) {
		next(error)
	}
}

const updateUser = async (req, res, next) => {
	try {
		const userId = req.params.id
		const updateData = req.body
		const avatarFile = req.file // Отримуємо файл, якщо переданий
		const avatarUrl = updateData.avatar // Отримуємо URL аватара, якщо переданий

		const { message } = await updateUserService(userId, updateData, avatarFile, avatarUrl)

		res.status(200).json({ message })
	} catch (error) {
		next(error)
	}
}

const deleteUser = async (req, res) => {
	try {
		const userId = req.params.id
		const { message } = await deleteUserService(userId)

		res.status(200).json({ message })
	} catch (error) {}
}

const getRoles = async (req, res, next) => {
	try {
		const roles = await getAllRoles()

		res.status(200).json(roles)
	} catch (error) {
		console.log(error)
		next(error)
	}
}

const getPositions = async (req, res, next) => {
	try {
		const positions = await getAllPositions()

		res.status(200).json(positions)
	} catch (error) {
		next(error)
	}
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, getRoles, getPositions }
