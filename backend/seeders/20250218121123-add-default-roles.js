'use strict'

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert('Roles', [
			{ name: 'Director', createdAt: new Date(), updatedAt: new Date() },
			{ name: 'Administrator', createdAt: new Date(), updatedAt: new Date() },
			{ name: 'Staff', createdAt: new Date(), updatedAt: new Date() },
		])
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Roles', null, {})
	},
}
