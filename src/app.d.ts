// See https://kit.svelte.dev/docs/types#app

import type { SafeUser } from '$lib/types/user'

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: SafeUser | undefined
            // artists: A
        }
        interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {}
