const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
	dialect: 'postgres',
	logging: false,
})

module.exports = { sequelize }
