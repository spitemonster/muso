import { db } from '../db'
import { DataTypes } from 'sequelize';

export const User = db.define("User", {
	id: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	isArtist: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
});