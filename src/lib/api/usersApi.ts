import axiosConfig from "@/config/axios.config"
import { User } from "../types/user.types"

export const getUsers = async (): Promise<User[]> => {
    try {
        const res = await axiosConfig.get("/users")
        return res.data
    } catch (error) {
        console.error(`Error on get users`, error)
        return []
    }
}

export const updateUser = async (id: number, newUserData: User): Promise<User | null> => {
    try {
        const res = await axiosConfig.put(`/users/${id}`, { newUserData })
        return res.data
    } catch (error) {
        console.log(`Error on put user ${id}`)
        return null
    }
}