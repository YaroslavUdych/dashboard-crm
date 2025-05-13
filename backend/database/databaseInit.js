require('./modelsInit')
const { sequelize } = require('@/config/database')

async function initDatabase() {
	try {
		await sequelize.authenticate()
		console.log('✅ Database connected.')
	} catch (error) {
		console.error('❌ Database connection failed:', error)
		process.exit(1)
	}
}

module.exports = { initDatabase }
