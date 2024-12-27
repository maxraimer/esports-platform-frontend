import React from 'react'

export default function UserHead({profilePic, nickname, publicName}) {
    return(
        <div className='w-full md:w-[20rem] h-full flex flex-col justify-center gap-2 items-center bg-base-100/70 backdrop-blur-md p-8 md:p-4 rounded-[1.5rem] md:rounded-[0.5rem] '>
            {/* Аватарка */}
            <img src={profilePic || "/images/nologo.png"} alt="avatar" className='w-[16rem] h-[16rem] md:w-[8rem] md:h-[8rem] rounded-full'/>
            {/* Нікнейм */}
            <div className='max-w-full text-[4.5rem] md:text-[1.5rem] text-white font-bold leading-[6rem] md:leading-8 truncate'>{nickname}</div>
            {/* Юзернейм */}
            <div className='max-w-full text-primary text-[2.5rem] md:text-[1rem] font-bold leading-[3rem] md:leading-4 text-right truncate'>@{publicName}</div>
        </div>
    )
}