import React from 'react'

export default function Team({team}) {
    return(
        <div className='bg-base-100 rounded-[2rem] md:rounded-[0.75rem] p-8 md:p-4 flex flex-col gap-4 md:gap-2'>
            <div className='text-[3.5rem] md:text-[1.125rem] font-bold text-accent'>Команда</div>
            {Object.keys(team).length > 0 ? 
                <div>{team.name}</div>
                :
                <div className='text-[2.5rem] md:text-[1rem]'>Команди поки що нема...</div>
            }  
        </div>
    )
}