const { APP } = require('./app.js')
const { initDatabase } = require('./database/databaseInit')

const PORT = process.env.PORT || 5000

const startServer = async () => {
	try {
		await initDatabase()

		APP.listen(PORT, () => {
			console.log(`✅ Server running on port ${PORT}...`)
		})
	} catch (error) {
		console.error('❌ Error starting the server:', error)
	}
}

startServer()
