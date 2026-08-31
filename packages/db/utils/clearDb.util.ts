import { sql } from 'drizzle-orm';
import { client } from '../db';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '../schema';

const main = async () => {
	const db = drizzle(client, { schema });
	const query = sql<string>`SELECT table_name
			FROM information_schema.tables
			WHERE table_schema = 'public'
			AND table_type = 'BASE TABLE';
		`;

	const result = await db.execute(query); // retrieve tables
	const tables = result.rows;

	for (const table of tables) {
		const query = sql.raw(
			`DROP TABLE IF EXISTS ${table.table_name} CASCADE;`
		);
		await db.execute(query); // Truncate (clear all the data) the table
	}

	client.end();
};

main();
