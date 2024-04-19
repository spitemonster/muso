// import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = () => {
	return new Response(String("POSTED"));
}

export const GET: RequestHandler = () => {
	return new Response(String("GOTTEN"));
};