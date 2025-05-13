'use strict'

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert('Positions', [
			{ name: 'Frontend developer', createdAt: new Date(), updatedAt: new Date() },
			{ name: 'Backend developer', createdAt: new Date(), updatedAt: new Date() },
			{ name: 'QA', createdAt: new Date(), updatedAt: new Date() },
			{ name: 'Project manager', createdAt: new Date(), updatedAt: new Date() },
		])
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Positions', null, {})
	},
}
