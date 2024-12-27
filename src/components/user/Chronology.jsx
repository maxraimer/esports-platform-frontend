import React from 'react'
import ChronologyBar from './ChronologyBar'

export default function Chronology({nickname, eventsList}) {
    return(
        <div className='bg-base-100 rounded-[2rem] md:rounded-[0.75rem] p-8 md:p-4 flex flex-col gap-4 md:gap-2'>
            <div className='text-[3.5rem] md:text-[1.125rem] font-bold text-accent'>Хронологія</div>
            <div className='flex flex-col gap-4 md:gap-2'>
                {eventsList.sort((a, b) => b.timestamp - a.timestamp).map(event => 
                    <ChronologyBar key={event.timestamp} nickname={nickname} event={event}/>
                )}
            </div>
        </div>
    )
}