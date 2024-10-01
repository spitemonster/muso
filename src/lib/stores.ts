import { writable, type Writable } from 'svelte/store'
import type { User } from '$lib/types'

export const loginSession = <Writable<User>>writable(undefined)
