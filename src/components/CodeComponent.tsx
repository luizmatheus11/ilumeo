import { useState } from 'react';
import { login } from '../services/login.service';
import { toast } from 'react-toastify';
export const CodeComponent = () => {
    const [username, setUsername] = useState<string>()
    const onClick = () => {
        login(username)
            .then(({ data }) => {
                localStorage.setItem('token', data.token)
                toast.success('Você logou com sucesso!')
                window.location.reload();
            }).catch((err) => {
                toast.error('Houve algum problema no seu login, tente novamente')
            })
    }
    return (
        <div className="w-full bg-transparent md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-9 md:space-y-10 sm:p-12">
                <h1 className="text-lg md:text-2xl text-text-color">
                    Ponto <b>Ilumeo</b>
                </h1>
                <form action="#">
                    <div className='relative pb-6'>
                        <label htmlFor="text" className='text-text-color text-xs font-extralight absolute pl-4 pt-2'>Código do usuário</label>
                        <input type="text" id="text" onChange={(event) => setUsername(event.target.value)} className="text-text-color text-xl block w-full font-semibold h-14 pl-4 pt-4 bg-input-color focus:outline-none rounded-[0.25rem]" />
                    </div>
                    <button type="submit" onClick={onClick}className="w-full text-input-color bg-button-color hover:bg-input-color hover:text-button-color focus:outline-none font-medium rounded-[0.25rem] text-sm px-5 py-2.5 text-center">Confirmar</button>
                </form>
            </div>
        </div>
    )
}