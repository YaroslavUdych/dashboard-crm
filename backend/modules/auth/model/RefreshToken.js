const { DataTypes } = require('sequelize')

const defineRefreshToken = (sequelize) => {
	const RefreshToken = sequelize.define('RefreshToken', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		refreshToken: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true, // 👈 Один рефреш-токен на одного юзера
			references: {
				model: 'Users', // Назва таблиці в БД
				key: 'id',
			},
			onDelete: 'CASCADE',
		},
	})

	return RefreshToken
}

module.exports = { defineRefreshToken }
