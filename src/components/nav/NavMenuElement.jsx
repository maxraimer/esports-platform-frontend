import React from 'react';
import { Link } from 'react-router-dom';

export default function NavMenuElement({icon, text, isActive, redirectTo}) {
    return (
        <Link to={redirectTo}>
            <div className={`font-bold w-auto h-[3.5rem] px-4 flex justify-center items-center bg-base-100 hover:bg-base-200 cursor-pointer gap-2 ${isActive ? 'border-b-2 border-primary' : ''} select-none`}>
                {icon}
                {text}
            </div>
        </Link>
    )
}