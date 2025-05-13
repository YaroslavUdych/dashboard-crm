const errorMiddleware = (err, req, res, next) => {
	console.error(`[ERROR] ${err.name}: ${err.message}`)

	// 🔥 Визначаємо статус-код (за замовчуванням 500)
	const statusCode = err.status || 500

	res.status(statusCode).json({
		success: false,
		message: err.message || 'Internal Server Error',
		errors: err.errors || null, // якщо є додаткові помилки (наприклад, валідація)
	})
}

module.exports = { errorMiddleware }
