import React from 'react'
import dayjs from 'dayjs'
import { Cup, Match } from '../svg/Icons'

export default function ChronologyBar({nickname, event}) {
    if (event.type === 'match') {
        return(
            <div className='p-8 md:p-4 flex flex-col gap-4 md:gap-2 text-[2.5rem] md:text-[1rem] bg-base-200 rounded-[1.5rem] md:rounded-[0.5rem]'>
                <div className='flex justify-between items-center'>
                    <div className='text-neutral flex gap-4 md:gap-2 items-center'><Match className='w-[2rem] h-[2rem] md:w-[0.75rem] md:h-[0.75rem] [&>*]:fill-neutral'/>Матч</div>
                    <div className='text-neutral/50 text-[1.5rem] md:text-[0.75rem]'>{dayjs(event.timestamp).format('HH:mm DD.MM.YYYY')}</div>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2 md:gap-1 items-baseline flex-wrap'>
                        <div className='font-bold text-primary'>{nickname}</div>
                        <div className='text-[1.75rem] md:text-[0.75rem] text-neutral'>у складі</div>
                        <div className='font-bold text-primary flex gap-1 items-center'>
                            {event.team}
                            <img src={event.teamImage} className='w-[1rem] h-[1rem]'/>
                        </div>
                        <div className='text-[1.75rem] md:text-[0.75rem] text-neutral'>проти</div>
                        <div className='font-bold text-primary flex gap-1 items-center'>
                            {event.opponentTeam}
                            <img src={event.opponentTeamImage} className='w-[1rem] h-[1rem]'/>
                        </div>
                        <div className='text-[1.75rem] md:text-[0.75rem] text-neutral'>в рамках</div>
                        <div className='font-bold text-primary flex gap-1 items-center'>
                            {event.tournamentName}
                            <img src={event.tournamentImage} className='w-[1rem] h-[1rem]'/>
                        </div>
                    </div>
                    {
                        event.status === 'lose' ? 
                            <><div className='badge badge-error hidden md:flex font-bold'>Lose</div><div className='rounded-full md:hidden flex text-[1.5rem] bg-error h-max text-error-content px-8 py-1 font-bold'>L</div></> :
                        event.status === 'win' ?
                            <><div className='badge badge-success hidden md:flex font-bold'>Win</div><div className='rounded-full md:hidden flex text-[1.5rem] bg-success h-max text-success-content px-8 py-1 font-bold'>W</div></> :
                        event.status === 'pending' ?
                            <><div className='badge badge-neutral hidden md:flex font-bold'>In-progress</div><div className='rounded-full md:hidden flex text-[1.5rem] bg-neutral h-max text-neutral-content px-8 py-1 font-bold'>...</div></> :
                        null
                    }
                </div>
            </div>
        )
    } else if (event.type === 'tournament') {
        return(
            <div className='p-8 md:p-4 flex flex-col gap-4 md:gap-2 text-[2.5rem] md:text-[1rem] bg-base-200 rounded-[1.5rem] md:rounded-[0.5rem]'>
                <div className='flex justify-between items-center'>
                    <div className='text-neutral flex gap-4 md:gap-2 items-center'><Cup className='w-[2rem] h-[2rem] md:w-[0.75rem] md:h-[0.75rem] [&>*]:fill-neutral'/>Турнір</div>
                    <div className='text-neutral/50 text-[1.5rem] md:text-[0.75rem]'>{dayjs(event.timestamp).format('HH:mm DD.MM.YYYY')}</div>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2 md:gap-1 items-baseline flex-wrap'>
                        <div className='font-bold text-primary'>{nickname}</div>
                        <div className='text-[1.75rem] md:text-[0.75rem] text-neutral'>у складі</div>
                        <div className='font-bold text-primary flex gap-1 items-center'>
                            {event.team}
                            <img src={event.teamImage} className='w-[1rem] h-[1rem]'/>
                        </div>
                        <div className='text-[1.75rem] md:text-[0.75rem] text-neutral'>{event.status === 'signedup' ? 'приймає участь в' : event.status === 'finished' ? 'завершив участь в' : 'в'}</div>
                        <div className='font-bold text-primary flex gap-1 items-center'>
                            {event.tournamentName}
                            <img src={event.tournamentImage} className='w-[1rem] h-[1rem]'/>
                        </div>
                    </div>
                    {   
                        event.status === 'finished' ?
                            event.result === '1' ? 
                                <><div className='badge bg-yellow-400 hidden md:flex font-bold text-yellow-950'>1 місце</div><div className='rounded-full md:hidden flex text-[1.5rem] bg-yellow-500 h-max text-yellow-950 px-8 py-1 font-bold '>1</div></> :
                            event.result === '2' ?
                                <><div className='badge bg-slate-400 hidden md:flex font-bold text-slate-900'>2 місце</div><div className='rounded-full md:hidden flex text-[1.5rem] bg-slate-500 h-max text-slate-900 px-8 py-1 font-bold'>2</div></> :
                            event.result === '3' ?
                                <><div className='badge bg-amber-800 hidden md:flex font-bold text-amber-100'>3 місце</div><div className='rounded-full md:hidden flex text-[1.5rem] bg-amber-800 h-max text-amber-100 px-8 py-1 font-bold'>3</div></> :
                                <><div className='badge badge-neutral hidden md:flex font-bold'>{event.result} місце</div><div className='rounded-full md:hidden flex text-[1.5rem] bg-neutral h-max text-neutral-content px-8 py-1 font-bold'>{event.result}</div></> :
                        null
                    }
                </div>
            </div>
        )
    }
}