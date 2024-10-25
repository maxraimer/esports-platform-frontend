import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import NavMenuElement from './NavMenuElement';
import { News, Cup, CupFilled, Match, Rating, Live, Market, ESP, Search, Activity, User, Friends, Team, AdminLocker, Settings, Exit, Organizer } from '../svg/Icons';

export default function Nav() {
    const location = useLocation();
    const authed = true;
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
                <div className='flex gap-2 mr-2 items-center'>
                    <label id='label_search' className="input input-bordered focus-within:border-primary flex items-center gap-2">
                        <Search className='h-4 w-4 opacity-70 [&>*]:fill-base-content'/>
                        <input id='search' type="text" className="" placeholder="Пошук"/>
                    </label>

                    <div className='dropdown dropdown-end'>
                        <div tabIndex={0} role='button' className='btn btn-ghost avatar'>
                            <div className='w-[2rem] h-[2rem] rounded-full ring-[2.5px] ring-primary'>
                                <img alt='profile_photo' src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
                            </div>
                        </div>
                        <ul tabIndex={0} className='menu menu-md dropdown-content bg-base-100 rounded-md z-[1] mt-4 w-52 p-2 shadow'>
                            <li><Link to='/user/1'><User className='w-[1rem] h-[1rem] px-[0.1rem] fill-base-content'/>Профіль</Link></li>
                            <div className='divider my-1'></div>
                            <li><Link to='/user/1/activity'><Activity className='w-[1rem] h-[1rem] fill-base-content'/>Активність</Link></li>
                            <li><Link to='/user/1/friends'><Friends className='w-[1rem] h-[1rem] fill-base-content'/>Друзі</Link></li>
                            <li><Link to='/user/1/teams'><Team className='w-[1rem] h-[1rem] fill-base-content'/>Команди</Link></li>
                            <li><Link to='/user/1/tournaments'><CupFilled className='w-[1rem] h-[1rem] p-[0.1rem] fill-base-content'/>Турніри</Link></li>
                            <div className='divider my-1'></div>
                            <li><Link to='/'><AdminLocker className='w-[1rem] h-[1rem] fill-base-content'/>Адмін-панель</Link></li>
                            <li><Link to='/'><Organizer className='w-[1rem] h-[1rem] fill-base-content'/>Організатор</Link></li>
                            <li><Link to='/user/1/settings'><Settings className='w-[1rem] h-[1rem] fill-base-content'/>Налаштування</Link></li>
                            <div className='divider my-1'></div>
                            <li><button className='text-error'><Exit className='w-[1rem] h-[1rem] p-[0.1rem] [&>*]:fill-error'/>Вихід</button></li>
                        </ul>
                    </div>
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