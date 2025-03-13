export interface User {
    id: number
    name: string
    username: string
    email: string
    adress: {
        city: string
        zipcode: string
    }
    compagny: {
        name: string
    }
}

export interface UsersState {
    users: User[]
    getUsers: () => Promise<void>
    updateUser: (id: number, newUserData: User) => void
}