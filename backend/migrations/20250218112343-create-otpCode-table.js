'use strict'
const { DataTypes } = require('sequelize')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('OtpCodes', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			otp: {
				type: DataTypes.STRING,
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
			type: {
				type: DataTypes.ENUM('activate', 'forgotPassword'),
				allowNull: false,
			},
			expiresAt: {
				type: DataTypes.DATE,
				allowNull: false,
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

	async down(queryInterface) {
		await queryInterface.dropTable('OtpCodes')
	},
}
