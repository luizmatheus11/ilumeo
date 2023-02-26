interface Props {
    date: string;
    time: string;
}
export const InputComponent = (props: Props) => {
    return (
        <div className='bg-input-color w-full h-12 flex justify-between items-center p-4 rounded-[0.25rem] mt-2'>
            <p className='text-text-color font-light text-sm'>{props.date}</p>
            <p className='text-text-color font-bold text-sm'>{props.time || '0m'}</p>
        </div>
    )
}