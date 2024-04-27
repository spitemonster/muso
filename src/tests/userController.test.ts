// import { vi, expect, test } from 'vitest'
// import { UserController } from '$lib/db/controllers'

// vi.mock('$lib/db/utils', () => ({
//     getUserFromDbByEmail: vi.fn().mockResolvedValue({
//         id: '90e688b8304b52bc',
//         name: 'Tony Bologna',
//         email: 'tony.bologna@gmail.com',
//         type: 'user',
//         password: 'password',
//     }),
//     getUserFromDbById: vi.fn().mockResolvedValue({
//         id: '90e688b8304b52bc',
//         name: 'Tony Bologna',
//         email: 'tony.bologna@gmail.com',
//         type: 'user',
//         password: 'password',
//     }),
//     userToSafeUser: vi.fn().mockResolvedValue({
//         id: '90e688b8304b52bc',
//         name: 'Tony Bologna',
//         email: 'tony.bologna@gmail.com',
//         type: 'user',
//     }),
// }))
// // further research required

// test('submits an incorrect user id to get an empty user', async () => {
//     const user = await UserController.FindSafeUserByID('000000')
//     expect(user.id == '').is.not
// })
