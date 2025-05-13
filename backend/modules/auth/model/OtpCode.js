const { DataTypes } = require('sequelize')

const defineOtpCode = (sequelize) => {
	const OtpCode = sequelize.define('OtpCode', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true, // 👈 Один рефреш-токен на одного юзера
			references: {
				model: 'Users', // Назва таблиці в БД
				key: 'id',
			},
		},
		otp: {
			type: DataTypes.STRING,
		},
		type: {
			type: DataTypes.ENUM('activate', 'forgotPassword'),
			allowNull: false,
		},
		expiresAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	})

	return OtpCode
}

module.exports = { defineOtpCode }
