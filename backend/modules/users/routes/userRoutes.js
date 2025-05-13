const express = require('express')

const { getUsers, getUserById, createUser, updateUser, deleteUser, getRoles, getPositions } = require('../controllers/userController')

const { validateRequest } = require('@/middlewares/validationMiddleware')
const { createUserValidation, getUserByIdValidation, updateUserValidation, deleteUserValidation } = require('../validators/userValidator')
const { authMiddleware } = require('@/middlewares/authMiddleware')
const { avatarUpload } = require('@/middlewares/uploadMiddleware')

const userRouter = express.Router()

userRouter.get('/', authMiddleware, getUsers)
userRouter.post('/create-user', authMiddleware, avatarUpload, createUserValidation, validateRequest, createUser)
userRouter.get('/roles', authMiddleware, getRoles)
userRouter.get('/positions', authMiddleware, getPositions)

userRouter.get('/:id', authMiddleware, getUserByIdValidation, validateRequest, getUserById)
userRouter.put('/:id', authMiddleware, avatarUpload, updateUserValidation, validateRequest, updateUser)
userRouter.delete('/:id', authMiddleware, deleteUserValidation, validateRequest, deleteUser)

module.exports = { userRouter }
