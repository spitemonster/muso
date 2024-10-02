// See https://kit.svelte.dev/docs/types#app

import type { Album } from '$lib/types'
import type { User } from '$lib/types/user.type'

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: User
            // artists: A
        }
        interface PageData {
            artists?: Artist[]
            artist?: Artist
            albums?: Album[]
            album?: Album
            tracks?: Track[]
            track?: Track
            tags?: Tag[]
            tag?: Tag
        }
        // interface PageState {}
        // interface Platform {}
    }
}

export {}
