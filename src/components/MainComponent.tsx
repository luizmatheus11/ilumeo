import { InputComponent } from './InputComponent';
import { User } from '../interfaces/user.interface';
import { useState, useEffect } from 'react';
import { formatDuration, intervalToDuration, format } from 'date-fns';
import { updateUser } from '../services/updateUser.service';
interface Props {
    user: User | undefined
}
export const MainComponent = (props: Props) => {
    const [time, setTime] = useState<string>('0h 0m')
    const [buttonText, setButtonText] = useState<string>('Hora de entrada')
    useEffect(() => {
        if (props.user?.work[0].startTime && !props.user.work[0].endTime) {
            setButtonText('Hora de saída')
            let interval = {
                start: new Date(props.user.work[0].startTime),
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
            }, 1000)
        }
    }, [])
    const handleTime = () => {
        let token = localStorage.getItem('token')
        if (!token) return;
        if (props.user?.work[0].startTime && !props.user.work[0].endTime) {
            updateUser(token, {
                endTime: new Date(),
                id: props.user.work[0].id
            }).then(({ data }) => {
                window.location.reload();
            })
        } else {
            updateUser(token, {
                startTime: new Date(),
                id: '2'
            })
            window.location.reload();
        }
    }
    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload()
    }
    return (
        <div className="w-full bg-transparent md:mt-0 sm:max-w-[27.5rem]">
            <div className="p-6">
                <div className='flex items-center justify-between'>
                    <p className='text-text-color font-bold text-sm'>Relógio de ponto</p>
                    <a onClick={logout} className='text-text-color font-bold text-sm cursor-pointer'>{props?.user?.username}</a>
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
                {props?.user?.work && props.user.work.length && props.user.work.map(w => {
                    if(w.startTime && w.endTime) {
                        return <InputComponent key={w.id} date={w.date!} time={w.diffTime!} />
                    }
                })}
            </div>
        </div>
    )
}