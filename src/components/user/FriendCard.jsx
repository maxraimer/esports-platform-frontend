import React from 'react'

export default function FriendCard({friend}) {
    return(
        <div className='flex items-center p-8 md:p-4 gap-8 md:gap-4 bg-base-200 rounded-[1.5rem] md:rounded-[0.5rem]'>
            <div className='w-[6rem] h-[6rem] md:w-[3rem] md:h-[3rem]'>
                <img src="/images/avatar.png" alt="friendsAvatar" className='rounded-full'/>
            </div>
            <div className='w-[19rem] md:w-[10rem]'>
                <div className='text-[2.5rem] md:text-[1rem]'>Ra1mer</div>
                <div className='text-[2.5rem] md:text-[1rem] text-primary'>@ra1mer</div>
            </div>
        </div>
    )
}