const multer = require('multer')

//  load file into memory
const storage = multer.memoryStorage()

const avatarUpload = multer({
	storage,
	limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
	fileFilter: (req, file, cb) => {
		const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg']
		if (allowedMimeTypes.includes(file.mimetype)) {
			cb(null, true)
		} else {
			cb(new Error('Only .jpg, .jpeg, .png, .webp, .svg files are allowed'), false)
		}
	},
}).single('avatar')

module.exports = { avatarUpload }
