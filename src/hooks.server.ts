import { db } from '$lib/server/db'

let initialized = false;

export async function handle({ event, resolve }) {
    if (!initialized) {
        await db.sync({ force: true});
        console.log('Database synchronized.');
        initialized = true;
    }
    return resolve(event);
}