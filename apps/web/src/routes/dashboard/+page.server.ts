import type { PageServerLoad } from './$types'
import { API_URL } from '$env/static/private'

export const load: PageServerLoad = async ({ locals }) => {
	console.log(API_URL)
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: `{
				artists(limit: 5) {
					name
					slug
				}
			}`,
		}),
	})

	const json = await res.json()

	const artists = json.data.artists

	return { artists }
}
