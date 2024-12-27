import React from 'react'
import FriendCard from './FriendCard'

export default function FriendsList({friends}) {
    return(
        <div className='bg-base-100 rounded-[2rem] md:rounded-[0.75rem] p-8 md:p-4 flex flex-col gap-4 md:gap-2'>
            <div className='text-[3.5rem] md:text-[1.125rem] font-bold text-accent'>Друзі</div>
            <div className='flex gap-4 md:gap-2 max-w-[70rem] overflow-x-auto'>
                {friends.length > 0 ? 
                    friends.map(friend => <FriendCard key={friend.id} friend={friend}/>)
                    :
                    <div className='text-[2.5rem] md:text-[1rem]'>Друзів поки що нема...</div>
                }                
            </div>
        </div>
    )
}