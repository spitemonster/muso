import { writable } from 'svelte/store'
import { type SafeUser } from '$lib/types/user'

export const activeUser = writable<SafeUser | undefined>(undefined)
