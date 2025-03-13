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