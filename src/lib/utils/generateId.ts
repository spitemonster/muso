import { randomBytes } from 'node:crypto'

export const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'

export default async function generateId(): Promise<string> {
    return await new Promise((resolve, reject) => {
        randomBytes(16, (err, buffer) => {
            if (err) {
                reject()
            }

            resolve(buffer.toString('hex'))
        })
    })
}
