import React, { useEffect, useState } from 'react'
import { Failed, Info, Success, Warn } from '../svg/Icons';

export default function AlertModal({text, type, id, duration = 5000}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Показуємо алерт при рендерингу
        setIsVisible(true);

        // Ховаємо алерт через `duration` мілісекунд
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer); // Очищаємо таймер при анмаунті
    }, [duration]);

    const baseClass = 'absolute w-screen h-[calc(100vh-6rem)] flex justify-center items-end z-50 transition-transform duration-500 ease-in-out';
    const alertClass = `min-w-[10rem] max-w-[48rem] alert flex gap-2 items-center`;

    const typeClass = {
        success: 'alert-success',
        failed: 'alert-error',
        warning: 'alert-warning',
        info: 'alert-info',
    };

    const iconComponent = {
        success: <Success className='h-6 w-6 shrink-0 stroke-current'/>,
        failed: <Failed className='h-6 w-6 shrink-0 stroke-current'/>,
        warning: <Warn className='h-6 w-6 shrink-0 stroke-current'/>,
        info: <Info className='h-6 w-6 shrink-0 stroke-current'/>,
    };

    return (
        <div id={id} className={`${baseClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div role="alert" className={`${alertClass} ${typeClass[type]}`}>
                {iconComponent[type]}
                <span>{text}</span>
            </div>
        </div>
    );
}