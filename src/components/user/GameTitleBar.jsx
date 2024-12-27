import React from 'react'
import { CS2, Dota2, Deadlock, Valorant, Lol } from '../svg/Icons'

export default function GameTitleBar({type, name, rank}) {

    const icons = {
        cs2: <CS2 className='[&>*]:fill-neutral w-full h-full'/>,
        dota2: <Dota2 className='[&>*]:fill-neutral w-full h-full'/>,
        deadlock: <Deadlock className='[&>*]:fill-neutral w-full h-full'/>,
        valorant: <Valorant className='[&>*]:fill-neutral w-full h-full'/>,
        lol: <Lol className='[&>*]:fill-neutral w-full h-full'/>
    }

    const cs2Colors = (rating) => {
        return rating === 0 ? '#e1e4e8' :
            rating <= 4999 ? '#b3c4d9' : 
            rating <= 9999 ? '#5e98d9' :
            rating <= 14999 ? '#4b69fe' :
            rating <= 19999 ? '#8947ff' :
            rating <= 24999 ? '#b12fc1' :
            rating <= 29999 ? '#eb4c4b' :
            '#f1ae35'
    }

    return(
        <div className='flex h-min justify-between items-center bg-base-200 py-6 px-8 md:py-2 md:px-4 rounded-[1.5rem] md:rounded-[0.5rem]'>
            <div className='flex items-center gap-8 md:gap-4'>
                <div className='w-[3.75rem] h-[3.75rem] md:w-[1.25rem] md:h-[1.25rem]'>{icons[type]}</div>
                <div className='text-[2.5rem] md:text-[1rem]'>{name}</div>
            </div>
                {type !== 'cs2' ? 
                    <img src={`/images/ranks/${type}/${rank}.png`} alt="rank" className='w-[6rem] h-[6rem] md:w-[2rem] md:h-[2rem]'/>
                    :
                    <div className='w-[6rem] h-[5rem] md:w-[2rem] md:h-[1rem] my-2 flex justify-center items-center text-[2.5rem] md:text-[1rem]'>-</div>
                    // <div className='w-[6rem] h-[3rem] md:w-[2rem] md:h-[1rem] my-2 flex justify-center items-center text-[2.25rem] md:text-[0.75rem] rounded' style={{backgroundColor: cs2Colors(rank), color: rank > 29999 || rank < 5000  ? 'black' : 'white'}}>{rank === 0 ? '?' : rank > 999 ? Math.floor(rank / 1000) + 'K' : rank}</div>
                }
        </div>
    )
}