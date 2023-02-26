import {Children} from 'react'
interface Props {
    children: JSX.Element | false
}
export const BaseComponent = (props: Props) => {
    return (
        <div className='w-full min-h-screen min-w-full bg-primary'>
            <div className='flex flex-col items-center justify-center px-6 py-12 mx-auto'>
               {props.children}
            </div>
        </div>
    )
}