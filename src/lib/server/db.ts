import { Sequelize } from 'sequelize'

import { DB_DATABASE, DB_USER } from '$env/static/private';

export const db = new Sequelize({
	dialect: 'postgres',
	database: DB_DATABASE,
	username: DB_USER,
	logging: console.log
})

try {
	await db.authenticate()
} catch (error) {
	console.error(error);
}