import React from 'react'
import { Confirmed, PlusSubscriber, ProPlayer } from '../svg/Icons'

export default function UserPins({flags}) {
    return(
        <div className='flex md:flex-col gap-4 md:gap-2 md:py-4'>
            {/* Значок перевіреного */}
            {flags.isVerified && <Confirmed className='w-[4rem] h-[4rem] md:w-[1.75rem] md:h-[1.75rem]'/>}
            {/* Значок професійного гравця */}
            {flags.isPro && <ProPlayer className='w-[4rem] h-[4rem] md:w-[1.75rem] md:h-[1.75rem]'/>}
            {/* Значок підписника */}
            {flags.isSubscriber && <PlusSubscriber className='w-[4rem] h-[4rem] md:w-[1.75rem] md:h-[1.75rem]'/>}
        </div>
    )
}