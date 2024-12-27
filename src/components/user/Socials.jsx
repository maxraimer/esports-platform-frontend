import React from 'react'
import SocialBar from './SocialBar'
import GameTitleBar from './GameTitleBar'

export default function Socials({socials, linkedAccounts}) {
    return(
        // <div className='flex flex-col w-full md:min-w-[20rem] md:max-w-min h-max bg-base-100 rounded-[2rem] md:rounded-[0.75rem] p-8 md:p-4 row-span-2 gap-4 md:gap-2'>
        <div className='flex flex-col w-full h-max bg-base-100 rounded-[2rem] md:rounded-[0.75rem] p-8 md:p-4 row-span-2 gap-4 md:gap-2'>
            <div className='text-[3.5rem] md:text-[1.125rem] font-bold text-accent'>Соціальні мережі</div>
            <div className='flex flex-col gap-4 md:gap-2'>
                {socials.map((social, index) => 
                    <SocialBar key={index} type={social.type} url={social.url} text={social.text} img={social.image}/>
                )}
            </div>

            <div className='divider my-2'></div>

            <div className='text-[3.5rem] md:text-[1.125rem] font-bold text-accent'>Ігрові акаунти</div>
            <div className='flex flex-col gap-4 md:gap-2'>
                {linkedAccounts.steam.linkedGames.map((game, index) => 
                    <GameTitleBar key={index} type={game.title} name={linkedAccounts.steam.name} rank={game.rank}/>
                )}
                {linkedAccounts.riot.linkedGames.map((game, index) => 
                    <GameTitleBar key={index} type={game.title} name={`${linkedAccounts.riot.name}#${linkedAccounts.riot.tag}`} rank={game.rank}/>
                )}
            </div>
        </div>
    )
}