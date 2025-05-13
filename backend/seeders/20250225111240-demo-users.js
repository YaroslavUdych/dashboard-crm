'use strict'

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert('Users', [
			{
				firstName: 'John',
				lastName: 'Doe',
				birthDate: '1990-01-31',
				email: 'doe@example.com',
				phone: '+420222222222',
				address: '123 Main St.',
				password: 'some hashed password',
				roleId: 1,
				positionId: 1,
				avatar: '/avatars/female004.webp',
				isActivated: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: 'Jane',
				lastName: 'Doe',
				birthDate: '1992-05-31',
				email: 'jane-doe@example.com',
				phone: '+420987654321',
				address: '142 Main St.',
				password: 'some hashed password',
				roleId: 2,
				positionId: 2,
				avatar: '/avatars/male003.webp',
				isActivated: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: 'Sem',
				lastName: 'Smith',
				birthDate: '1995-07-14',
				email: 'sem-smith@example.com',
				phone: '+420123456789',
				address: '326 Main St.',
				password: 'some hashed password',
				roleId: 3,
				positionId: 3,
				avatar: '/avatars/male008.webp',
				isActivated: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: 'Samantha',
				lastName: 'Davis',
				birthDate: '1989-11-22',
				email: 'davis@example.com',
				phone: '+420111111111',
				address: '962 Main St.',
				password: 'some hashed password',
				roleId: 3,
				positionId: 4,
				avatar: '/avatars/female007.webp',
				isActivated: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Users', null, {})
	},
}
