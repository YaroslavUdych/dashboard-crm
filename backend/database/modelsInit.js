const { sequelize } = require('@/config/database')
const { associateModels } = require('./associations')

const { defineUser } = require('@/modules/users/model/User')
const { defineRole } = require('@/modules/roles/model/Role')
const { definePosition } = require('@/modules/positions/model/Position')
const { defineService } = require('@/modules/services/model/Service')
const { defineRefreshToken } = require('@/modules/auth/model/RefreshToken')
const { defineOtpCode } = require('@/modules/auth/model/OtpCode')

// Initialization of models
const Role = defineRole(sequelize)
const Position = definePosition(sequelize)
const Service = defineService(sequelize)
const RefreshToken = defineRefreshToken(sequelize)
const OtpCode = defineOtpCode(sequelize)
const User = defineUser(sequelize)

// Adding relationships between models
associateModels({ User, Role, Position, Service, RefreshToken, OtpCode })

module.exports = { User, Role, Position, Service, RefreshToken, OtpCode }
