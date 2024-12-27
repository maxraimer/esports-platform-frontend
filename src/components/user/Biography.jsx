import React from 'react'
import { defineYearsText } from '../../scripts/misc'
import dayjs from 'dayjs'

export default function Biography({firstName, lastName, dateOfBirth, age, address, about, flags}) {
    const isBirthdayToday = () => {
        const today = dayjs().format('DD.MM.YYYY');
        const [dayToday, monthToday, yearToday] = today.split('.');
        const [dayDB, monthDB, yearDB] = dateOfBirth.split('.');
        return dayToday === dayDB && monthToday === monthDB;
    }
    
    return(
        <div className='max-w-full max-h-max bg-base-100 rounded-[2rem] md:rounded-[0.75rem] p-8 md:p-4 flex flex-col gap-4 md:gap-2'>
            <div className='text-[3.5rem] md:text-[1.125rem] font-bold text-accent'>Біографія</div>

            <div className='flex flex-col gap-8 md:gap-4'>
                <div>
                    <div className='text-[1.8rem] md:text-[0.6rem] text-neutral'>Ім'я та прізвище</div>
                    <div className='text-[2.5rem] md:text-[1rem] truncate'>{firstName} {lastName}</div>
                </div>
                <div>
                    <div className='text-[1.8rem] md:text-[0.6rem] text-neutral'>Дата народження</div>
                    <div className='text-[2.5rem] md:text-[1rem]'>{dateOfBirth} ({age} {defineYearsText(age)}) {isBirthdayToday() ? '🥳' : ''}</div>
                </div>
                <div>
                    <div className='text-[1.8rem] md:text-[0.6rem] text-neutral'>Місто</div>
                    <div className='text-[2.5rem] md:text-[1rem]'>{address}</div>
                </div>
                <div>
                    <div className='text-[1.8rem] md:text-[0.6rem] text-neutral'>Про себе</div>
                    <div className='text-[2.5rem] md:text-[1rem]'>{about}</div>
                </div>
                <div>
                    <div className='text-[1.8rem] md:text-[0.6rem] text-neutral'>Ролі</div>
                    <div className='flex gap-4 md:gap-2 mt-1 flex-wrap'>
                        {flags.isAdmin && <div className='badge badge-error text-[2rem] md:text-[0.7rem] p-6 md:p-2'>Адміністратор</div>}
                        {flags.isModerator && <div className='badge badge-warning text-[2rem] md:text-[0.7rem] p-6 md:p-2'>Модератор</div>} 
                        {flags.isOrg && <div className='badge badge-secondary text-[2rem] md:text-[0.7rem] p-6 md:p-2'>Організатор</div>}
                        {flags.isDirector && <div className='badge badge-accent text-[2rem] md:text-[0.7rem] p-6 md:p-2'>Режисер</div>}
                        {flags.isCaster && <div className='badge badge-accent text-[2rem] md:text-[0.7rem] p-6 md:p-2'>Коментатор</div>}
                        {flags.isPlayer && <div className='badge badge-primary text-[2rem] md:text-[0.7rem] p-6 md:p-2'>Гравець</div>}
                        {flags.isCoach && <div className='badge badge-primary text-[2rem] md:text-[0.7rem] p-6 md:p-2'>Тренер</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}