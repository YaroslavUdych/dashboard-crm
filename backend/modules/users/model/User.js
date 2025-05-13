const { DataTypes } = require('sequelize')

const defineUser = (sequelize) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fullName: {
			type: DataTypes.VIRTUAL,
			get() {
				return `${this.firstName} ${this.lastName}`
			},
		},
		birthDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		age: {
			type: DataTypes.VIRTUAL,
			get() {
				if (!this.birthDate) return null

				const birthDate = new Date(this.birthDate)
				birthDate.setHours(0, 0, 0, 0)

				const today = new Date()
				today.setHours(0, 0, 0, 0)

				let age = today.getFullYear() - birthDate.getFullYear()

				const monthDiff = today.getMonth() - birthDate.getMonth()
				if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
					age--
				}

				return age
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			defaultValue: null,
		},
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Roles', // Назва таблиці у базі
				key: 'id',
			},
		},
		positionId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Positions', // Назва таблиці у базі
				key: 'id',
			},
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isActivated: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	})

	return User
}

module.exports = { defineUser }
