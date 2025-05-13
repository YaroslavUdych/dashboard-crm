'use strict'
const { DataTypes } = require('sequelize')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
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
			birthDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
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
				allowNull: true,
				references: {
					model: 'Roles', // Назва таблиці у базі
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
			positionId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'Positions', // Назва таблиці у базі
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
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
				defaultValue: Sequelize.literal('NOW()'),
				allowNull: false,
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: Sequelize.literal('NOW()'),
				allowNull: false,
			},
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users')
	},
}
