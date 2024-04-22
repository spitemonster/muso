import { writable } from 'svelte/store'

export type SessionUserData = {
    email: string
    name: string
}

const u: SessionUserData = {
    email: '',
    name: '',
}

export const activeUser = writable(u)
