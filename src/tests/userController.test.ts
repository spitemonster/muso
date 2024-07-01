import { vi, expect, describe, it } from 'vitest'
import { UserController } from '$lib/db/controllers'

import type { SafeUser, NewUser, LoginUserResponse } from '$lib/types'
import bcrypt from 'bcrypt'

// override user utils functions as they directly interact with the database
import userData from './data/users.data.json'
vi.mock('$lib/db/utils', async () => {
    const { userToSafeUser } = await vi.importActual(
        '../lib/db/utils/user.utils.ts'
    )

    return {
        getUserFromDbByEmail: vi.fn().mockImplementation(async (email) => {
            const user = userData.find((u) => {
                return u.email === email
            })

            if (!user) return null

            return user
        }),
        getUserFromDbById: vi.fn().mockImplementation(async (id) => {
            const user = userData.find((u) => {
                return u.id === id
            })

            if (!user) return null

            return user
        }),
        createUser: vi.fn().mockImplementation(async (newUser) => {
            if (newUser.name != '') {
                return {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    type: newUser.type,
                } as SafeUser
            } else {
                return null
            }
        }),
        userToSafeUser,
    }
})

// we don't really need to worry about this in this context so easier just to overwrite it than create new fake user data
vi.spyOn(bcrypt, 'compare').mockImplementation((data, hashed) => {
    return data === hashed
})

describe('UserController', () => {
    describe('CreateUser', () => {
        it('returns a safe user with valid information when given valid new user data', async () => {
            const newUser: NewUser = {
                id: '',
                email: userData[1].email,
                name: userData[1].name,
                password: userData[1].password,
                type: userData[1].type,
            }

            const user = await UserController.CreateUser(newUser)
            expect(user).not.toBe(null)
            expect(user).toHaveProperty('id')
            expect(user).toHaveProperty('name', newUser.name)
            expect(user).toHaveProperty('email', newUser.email)
            expect(user).not.toHaveProperty('password')
        })

        it('returns null when given empty new user data', async () => {
            const newUser: NewUser = {
                id: '',
                email: '',
                name: '',
                password: '',
                type: '',
            }

            const user = await UserController.CreateUser(newUser)
            expect(user).toBe(null)
        })
    })
    describe('FindSafeUserById', () => {
        it('returns null when given a non-existent user id', async () => {
            const user = await UserController.FindSafeUserById('000000')
            expect(user).toBe(null)
        })

        it('retrieves a valid safe user when given an extant user id', async () => {
            const testUser = userData[2]
            const user = await UserController.FindSafeUserById(testUser.id)
            expect(user).not.toBe(null)
            expect(user).toHaveProperty('id', testUser.id)
            expect(user).toHaveProperty('name', testUser.name)
            expect(user).not.toHaveProperty('password')
        })
    })

    describe('FindSafeUserByEmail', () => {
        it('returns null when given a non-existent user email', async () => {
            const user =
                await UserController.FindSafeUserByEmail('1234@email.test')
            expect(user).toBe(null)
        })

        it('returns a valid safe user when given an extant user email', async () => {
            const testUser = userData[2]
            const user = await UserController.FindSafeUserByEmail(
                testUser.email
            )
            expect(user).not.toBe(null)
            expect(user).toHaveProperty('id', testUser.id)
            expect(user).toHaveProperty('name', testUser.name)
            expect(user).not.toHaveProperty('password')
        })
    })

    describe('FindUserById', () => {
        it('returns null when given a non-existent user id', async () => {
            const user = await UserController.FindUserById('000000')
            expect(user).toBe(null)
        })

        it('returns null when given an empty string', async () => {
            const user = await UserController.FindUserById('')
            expect(user).toBe(null)
        })

        it('retrieves a valid unsafe user when given an extant user id', async () => {
            const testUser = userData[2]
            const user = await UserController.FindUserById(testUser.id)
            expect(user).not.toBe(null)
            expect(user).toHaveProperty('id', testUser.id)
            expect(user).toHaveProperty('name', testUser.name)
            expect(user).toHaveProperty('password', testUser.password)
        })
    })

    describe('FindUserByEmail', () => {
        it('returns null when given a non-existent user email', async () => {
            const user = await UserController.FindUserByEmail('1234@email.test')
            expect(user).toBe(null)
        })

        it('returns null when given an empty string', async () => {
            const user = await UserController.FindUserByEmail('')
            expect(user).toBe(null)
        })

        it('returns a valid unsafe user when given an extant user email', async () => {
            const testUser = userData[2]
            const user = await UserController.FindUserByEmail(testUser.email)
            expect(user).not.toBe(null)
            expect(user).toHaveProperty('id', testUser.id)
            expect(user).toHaveProperty('name', testUser.name)
            expect(user).toHaveProperty('password', testUser.password)
        })
    })

    describe('LoginUser', () => {
        it('returns a valid token and no error when given valid login data', async () => {
            const testUser = userData[0]
            const res: LoginUserResponse = await UserController.LoginUser(
                testUser.email,
                testUser.password
            )

            expect(res).not.toBe(null)
            expect(res.user).not.toBe(undefined)
            expect(res.user).not.toBe(null)
            expect(res).toHaveProperty('error')
            expect(res.error).toBe(false)
            expect(res).toHaveProperty('token')
            expect(res.token).not.toBe(null)
        })

        it('returns no token and an error message when given invalid login data', async () => {
            const testUser = userData[0]
            const res: LoginUserResponse = await UserController.LoginUser(
                testUser.email,
                'password123'
            )

            expect(res).not.toBe(null)
            expect(res.user).toBe(null)
            expect(res).toHaveProperty('error', true)
            expect(res).toHaveProperty('token', '')
            expect(res).toHaveProperty('message')
            expect(res.message).not.toBe('')
        })
    })
})
