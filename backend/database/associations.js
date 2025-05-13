function associateModels({ User, Role, Position, Service, RefreshToken, OtpCode }) {
	// === User & Role === (One-to-Many)
	User.belongsTo(Role, { foreignKey: 'roleId', as: 'role', onUpdate: 'CASCADE', onDelete: 'SET NULL' })
	Role.hasMany(User, { foreignKey: 'roleId', as: 'users', onUpdate: 'CASCADE', onDelete: 'SET NULL' })

	// === User & Position === (One-to-Many)
	User.belongsTo(Position, { foreignKey: 'positionId', as: 'position', onUpdate: 'CASCADE', onDelete: 'SET NULL' })
	Position.hasMany(User, { foreignKey: 'positionId', as: 'users', onUpdate: 'CASCADE', onDelete: 'SET NULL' })

	// === User & Services (Many-to-Many через таблицю UserServices) ===
	User.belongsToMany(Service, { through: 'UserServices', as: 'services', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	Service.belongsToMany(User, { through: 'UserServices', as: 'users', onUpdate: 'CASCADE', onDelete: 'SET NULL' })

	// === User & RefreshToken (One-to-one)
	User.hasOne(RefreshToken, { foreignKey: 'userId', as: 'refreshToken', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	RefreshToken.belongsTo(User, { foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'SET NULL' })

	// === User & OtpCode (One-to-one)
	User.hasOne(OtpCode, { foreignKey: 'userId', as: 'otpCode', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	OtpCode.belongsTo(User, { foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'SET NULL' })

	console.log('✅ Database associations initialized.')
}

module.exports = { associateModels }
