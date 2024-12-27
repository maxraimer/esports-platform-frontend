import React from 'react'

export default function Achievements({achievements}) {
    achievements = [1,2,3,4]
    return(
        <div className='bg-base-100 rounded-[2rem] md:rounded-[0.75rem] p-8 md:p-4 flex flex-col gap-4 md:gap-2'>
            <div className='text-[3.5rem] md:text-[1.125rem] font-bold text-accent'>Досягнення</div>
            <div className='flex gap-4 md:gap-2 max-w-[70rem] overflow-x-auto'>
                {achievements.length > 0 ? 
                    achievements.map((achievement, index) => <div key={index} className='w-[5rem] h-[5rem] md:w-[3rem] md:h-[3rem] bg-base-200 p-2 rounded-[0.5rem] md:rounded-[0.3rem]'><img src='/images/esl.png' alt='ach' className='h-full w-auto'/></div>)
                    :
                    <div className='text-[2.5rem] md:text-[1rem]'>Досягнень поки що нема...</div>
                }                
            </div>
        </div>
    )
}