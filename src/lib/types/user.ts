// enum UserType {
//     0 = 'Artist',
// }

export interface User {
    id: string
    email: string
    name: string
    password: string
    type: string
}

export interface SafeUser {
    id: string
    email: string
    name: string
    type: string
}
