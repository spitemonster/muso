import { writable } from 'svelte/store'

export type SessionUserData = {
    email: string
    name: string
    active: boolean
}

const u: SessionUserData = {
    email: '',
    name: '',
    active: false,
}

export const activeUser = writable(u)
