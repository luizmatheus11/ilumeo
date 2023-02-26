import { env } from '../env'
import axios from 'axios';
import { Login } from '../interfaces/user.interface';
export const login = (username?: string) => {
    return axios.post<Login>(`${env.API_URL}/users/login`, { username })
}