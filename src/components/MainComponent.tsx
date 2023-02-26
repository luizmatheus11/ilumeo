import { InputComponent } from './InputComponent';
import { User } from '../interfaces/user.interface';
import { useState, useEffect } from 'react';
import { formatDuration, intervalToDuration, format } from 'date-fns';
import { updateUser } from '../services/updateUser.service';
import { getUser } from '../services/getUser.service';
import { toast } from 'react-toastify';
interface Props {
    token: string | undefined;
}
export const MainComponent = (props: Props) => {
    const [time, setTime] = useState<string>('0h 0m')
    const [buttonText, setButtonText] = useState<string>('Hora de entrada')
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true)
        getUser(props?.token!)
            .then(({ data }) => {
                setUser(data)
                if (data?.work[0].startTime && !data.work[0].endTime) {
                    setButtonText('Hora de saída')
                    let interval = {
                        start: new Date(data.work[0].startTime),
                        end: new Date()
                    }
                    let intervalDuration = intervalToDuration(interval)
                    let formatDurationTime = formatDuration(intervalDuration, {
                        format: ['hours', 'minutes'],
                        zero: true
                    }).replace(' minutes', 'm').replace(' hours', 'h')

                    setTime(formatDurationTime)

                    setInterval(() => {
                        setTime(formatDurationTime)
                    }, 10000)
                }
                setLoading(false)
            }).catch((err) => {
                toast.error('Houve um erro ao tentar recuperar os dados do usuário, tente novamente')
                localStorage.removeItem('token')
                setLoading(false)
                window.location.reload()
            })
    }, [])

    const handleTime = () => {
        let token = localStorage.getItem('token')
        if (!token) return;
        if (user?.work[0].startTime && !user.work[0].endTime) {
            updateUser(token, {
                endTime: new Date(),
                id: user.work[0].id
            }).then(({ data }) => {
                window.location.reload();
            })
        } else {
            updateUser(token, {
                startTime: new Date(),
                id: '2'
            }).then(data => {
                window.location.reload();
            })
        }
    }
    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload()
    }
    return (
        <>
            {loading && <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-button-color" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                <span className="sr-only">Loading...</span>
            </div>}
            {!loading && <div className="w-full bg-transparent md:mt-0 sm:max-w-[27.5rem]">
                <div className="p-6">
                    <div className='flex items-center justify-between'>
                        <p className='text-text-color font-bold text-sm'>Relógio de ponto</p>
                        <a onClick={logout} className='text-text-color font-bold text-sm cursor-pointer'>{user?.username}</a>
                    </div>
                    <p className='text-gray-500 font-extralight text-sm text-right'>Usuário</p>
                    <div className='pt-3'>
                        <h1 className='text-text-color text-3xl font-bold font-sans'>{time}</h1>
                    </div>
                    <p className='p-0 text-text-color text-sm'>Horas de Hoje</p>
                    <div className='pt-5'>
                        <button type="submit" onClick={handleTime} className="w-full text-input-color bg-button-color hover:bg-input-color hover:text-button-color focus:outline-none font-bold rounded-[0.25rem] text-xl p-3 text-center">{buttonText}</button>
                    </div>
                    <div className='pt-5'>
                        <p className='text-text-color font-bold text-sm'>Dias anteriores</p>
                    </div>
                    {user?.work && user.work.length && user.work.map(w => {
                        if (w.startTime && w.endTime) {
                            return <InputComponent key={w.id} date={w.date!} time={w.diffTime?.replace(' minute', 'm')!} />
                        }
                    })}
                </div>
            </div>}
        </>
    )
}