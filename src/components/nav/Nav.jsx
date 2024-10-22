import React from 'react'
import { useLocation } from 'react-router-dom';
import NavMenuElement from './NavMenuElement';
import { News, Cup, Match, Rating, Live, Market, ESP } from '../svg/Icons';

export default function Nav() {
    const location = useLocation();
    const authed = false;
    const currentPath = location.pathname;
    return(
        <div id='nav' className='w-full h-[3.5rem] bg-base-100 flex justify-between'>
            <div className='flex gap-2'>
                {/* Logo */}
                <div className='flex justify-center items-center w-auto h-full aspect-square'><ESP className='w-[2rem] h-[2rem] [&>*]:fill-base-content'/></div>

                {/* Nav Menu */}
                <div className='flex gap-2'>
                    <NavMenuElement icon={<News className='w-[1rem] h-[1rem] [&>*]:fill-base-content'/>} text='Новини' redirectTo='/' isActive={currentPath === '/'}/>
                    <NavMenuElement icon={<Cup className='w-[1rem] h-[1rem] [&>*]:fill-base-content'/>} text='Турніри' redirectTo='/tournaments' isActive={currentPath === '/tournaments'}/>
                    <NavMenuElement icon={<Match className='w-[1rem] h-[1rem] [&>*]:fill-base-content'/>} text='Матчі' redirectTo='/matches' isActive={currentPath === '/matches'}/>
                    <NavMenuElement icon={<Rating className='w-[1.2rem] h-[1.2rem] [&>*]:fill-base-content'/>} text='Рейтинг' redirectTo='/rankings' isActive={currentPath === '/rankings'}/>
                    <NavMenuElement icon={<Live className='w-[1.2rem] h-[1.2rem] [&>*]:fill-base-content'/>} text='Ефіри' redirectTo='/streams' isActive={currentPath === '/streams'}/>
                    <NavMenuElement icon={<Market className='w-[1rem] h-[1rem] [&>*]:fill-base-content'/>} text='Маркетплейс' redirectTo='/market' isActive={currentPath === '/market'}/>
                </div>
            </div>

            {/* User Space */}
            {authed ? 
                <div>

                </div>
                :
                <div className='flex gap-2 justify-center items-center px-4'>
                    <button className='btn px-4 py-2 btn-primary' onClick={() => document.getElementById('auth_modal').showModal()}>Вхід</button>
                    <button className='btn px-4 py-2 bg-base-200' onClick={() => document.getElementById('reg_modal').showModal()}>Реєстрація</button>
                </div>
            }
        </div>
    )
}