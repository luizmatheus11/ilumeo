import { BaseComponent } from './components/BaseComponent'
import { CodeComponent } from './components/CodeComponent'
import './global.css'
import { toast} from 'react-toastify';
import { useEffect, useState } from 'react';
import { MainComponent } from './components/MainComponent';
import { getUser } from './services/getUser.service';
import { User } from './interfaces/user.interface';
export const App = () => {

    const [isAuth, setAuth] = useState<boolean>(false)
    const [userData, setUserData] = useState<User>()

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) return

        getUser(token)
            .then(({ data }) => {
                setAuth(true)
                setUserData(data)
            }).catch((err) => {
                toast.error('Houve um erro ao tentar recuperar os dados do usuário, tente novamente')
                localStorage.removeItem('token')
                setAuth(false)
            })
    }, [])

    return (
        <BaseComponent>
            {isAuth ? <MainComponent user={userData} /> : <CodeComponent />}
        </BaseComponent>
    )
}