'use strict'
const { DataTypes } = require('sequelize')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('RefreshTokens', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			refreshToken: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
				references: {
					model: 'Users',
					key: 'id',
				},
				onDelete: 'CASCADE',
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
		await queryInterface.dropTable('RefreshTokens')
	},
}
