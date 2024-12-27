import React from 'react'
import { Edit } from '../svg/Icons'

export default function UserProfileSettings() {
    return(
        <button className='btn btn-lg md:btn-sm bg-base-100 md:bg-base-100/50 md:hover:bg-base-100 rounded-xl md:rounded-md'>
            <Edit className='md:w-[1rem] w-[2rem] md:h-[1rem] h-[2rem] fill-base-content'/>
        </button>
    )
}