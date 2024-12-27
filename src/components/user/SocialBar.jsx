import React from 'react'
import { External, Steam, Telegram } from '../svg/Icons'

export default function SocialBar({type, text, url, img}) {

    const icons = {
        steam: <Steam className='[&>*]:fill-neutral w-auto h-[3.75rem] md:h-[1.25rem]'/>,
        telegram: <Telegram className='[&>*]:fill-neutral w-auto h-[3.75rem] md:h-[1.25rem]'/>
    }

    const handleClick = () => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return(
        <button className='btn relative h-min flex justify-between items-center bg-base-200 py-6 px-8 md:py-2 md:px-4 rounded-[1.5rem] md:rounded-[0.5rem]' onClick={handleClick}>
            <div className='absolute right-[0.5rem] top-[0.5rem] md:right-[0.25rem] md:top-[0.25rem]'><External className='w-[2rem] md:w-[0.75rem] h-[2rem] md:h-[0.75rem] fill-neutral'/></div>
            <div className='flex items-center gap-8 md:gap-4'>
                <img src={img} alt="avatar" className='w-[6rem] h-[6rem] md:w-[2rem] md:h-[2rem] rounded-full'/>
                <div className='text-[2.5rem] md:text-[1rem]'>{text}</div>
            </div>
            <div>{icons[type]}</div>
        </button>
    )
}