'use strict'
const { DataTypes } = require('sequelize')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Services', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			cost: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			discountPercentage: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			executionTime: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
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
		await queryInterface.dropTable('Services')
	},
}
