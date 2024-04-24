import { randomBytes } from 'node:crypto'

export const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'

export async function generateID(): Promise<string> {
    return await new Promise((resolve, reject) => {
        randomBytes(8, (err, buffer) => {
            if (err) {
                reject()
            }

            resolve(buffer.toString('hex'))
        })
    })
}
