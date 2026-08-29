import type { User } from '$lib/types';

declare module 'jsonwebtoken';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User;
			// artists: A
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
