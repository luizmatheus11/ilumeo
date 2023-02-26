import { BaseComponent } from './components/BaseComponent'
import { CodeComponent } from './components/CodeComponent'
import './global.css'
import { useEffect, useState } from 'react';
import { MainComponent } from './components/MainComponent';
export const App = () => {

    const [isAuth, setAuth] = useState<boolean>(false)
    const [token, setToken] = useState<string>()

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) return
        setAuth(true)
        setToken(token)
    }, [])

    return (
        <BaseComponent>
          {isAuth ? <MainComponent token={token} /> : <CodeComponent />}
        </BaseComponent>
    )
}