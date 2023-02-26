import axios from "axios"
import { env } from '../env'
import { User } from "../interfaces/user.interface"

export const getUser = (token: string) => {
    return axios.get<User>(`${env.API_URL}/users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}