import { randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const randomBytesAsync = promisify(randomBytes)

export const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'

// export function generateID(length: number = 8): string {

//     let randomString = ''
//     for (let i = 0; i < length; i++) {
//         const randomPosition = Math.floor(Math.random() * charset.length)
//         randomString += charset.charAt(randomPosition)
//     }
//     return randomString
// }

export async function generateID(): Promise<string> {
    return await new Promise((resolve, reject) => {
        randomBytes(8, (err, buffer) => {
            if (err) {
                reject(-1)
            }

            resolve(buffer.toString('hex'))
        })
    })
}

function test(length: number = 8) {
    const str = randomBytes(2)

    console.log(str)
}
