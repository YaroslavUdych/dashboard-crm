'use strict'
const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('UserServices', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Users', // Посилання на Users
					key: 'id',
				},
				onDelete: 'CASCADE', // Видалення користувача = видалення його зв’язків
				onUpdate: 'CASCADE',
			},
			serviceId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Services', // Посилання на Services
					key: 'id',
				},
				onDelete: 'SET NULL', // Якщо сервіс видалено, зв’язок стає NULL
				onUpdate: 'CASCADE',
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('NOW()'),
			},
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('UserServices')
	},
}
