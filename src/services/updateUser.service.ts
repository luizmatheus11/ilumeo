import { Work } from '../interfaces/user.interface';
import axios from 'axios';
import { env } from '../env';
export const updateUser = (token: string, data: Work) => {
    return axios.put(`${env.API_URL}/users`, {
        ...{...data.startTime && {startTime: data.startTime}},
        ...{...data.endTime && {endTime: data.endTime}},
        ...{...data.id && {id: data.id}}
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}