const { DataTypes } = require('sequelize')

const defineService = (sequelize) => {
	const Service = sequelize.define('Service', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		//  Собівартість послуги. Ціна закупівлі матеріалів, оплата праці, оренда обладнання, тощо
		cost: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				min: 0,
			},
		},
		// Ціна послуги для клієнта
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				min: 0,
			},
		},
		// Віртуальне поле для динамічного розрахунку прибутку від послуги
		profitMargin: {
			type: DataTypes.VIRTUAL,
			get() {
				const price = this.price || 0 // Якщо null, встановлюється 0
				const cost = this.cost || 0 // Якщо null, встановлюється 0
				return price - cost
			},
		},
		// Віртуальне поле для динамічного розрахунку відсотку націнки на послугу
		markupPercentage: {
			type: DataTypes.VIRTUAL,
			get() {
				const cost = this.cost || 0
				const price = this.price || 0
				if (cost <= 0) return 0 // Якщо собівартість не задана або <= 0
				return ((price - cost) / cost) * 100
			},
		},
		// Відсоток знижки на послугу
		discountPercentage: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		// Віртуальне поле для динамічного розрахунку зниженої ціни на послугу
		discountedPrice: {
			type: DataTypes.VIRTUAL,
			get() {
				const discount = this.discountPercentage || 0 // Якщо null, встановлюється 0
				return this.price - (this.price * discount) / 100
			},
		},
		// Флаг, чи послуга доступна для замовлення (Boolean, наприклад, true або false)
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		// Час виконання послуги в хвилинах
		executionTime: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		// Опис послуги
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	})
	return Service
}

module.exports = { defineService }
