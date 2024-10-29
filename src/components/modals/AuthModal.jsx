import React, { useState } from 'react';
import { EyeClosed, EyeOpened, Google, Password, Steam, Telegram, User } from '../svg/Icons';
import { useAlert } from '../../context/AlertContext';
import { useUser } from '../../context/UserContext';
import { api_login } from '../../scripts/api';
import { addClass, clearValue, closeModal, getValue, openModal, removeClass } from '../../scripts/misc';
import { getTokenExpiration } from '../../scripts/token';

export default function AuthModal() {

    const { login } = useUser();

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [authErrorMessage, setAuthErrorMessage] = useState('');
    
    const { showAlert } = useAlert();

    const handleSwitchAuth = () => {
        clearAll();
        closeModal('auth_modal');
        openModal('reg_modal');
    }

    const clearAll = () => {
        setAuthErrorMessage('');
        clearValue('auth_login');
        clearValue('auth_password');
        removeClass('label_auth_login', 'border-error');
        removeClass('label_auth_password', 'border-error');
    }

    const handleInputChange = () => {
        setAuthErrorMessage('');
        removeClass('label_auth_login', 'border-error');
        removeClass('label_auth_password', 'border-error');
    }

    const handleLogin = async () => {
        addClass('loginButtonText', ['loading', 'loading-spinner']);

        const username = getValue('auth_login');
        const password = getValue('auth_password');

        if (!username || !password) {
            setAuthErrorMessage('Введіть, будь ласка, свої дані.');

            addClass('label_auth_login', 'border-error');
            addClass('label_auth_password', 'border-error');
            removeClass('loginButtonText', ['loading', 'loading-spinner']);
            return;
        }

        setAuthErrorMessage('');

        try {
            const response = await api_login(username, password);

            if (response.status === 200) {
                delete response.data.user.password;
                getTokenExpiration(response.data.token);
                login(response.data.token);
                removeClass('loginButtonText', ['loading', 'loading-spinner']);
                clearAll();
                closeModal('auth_modal');
                showAlert('Ви успішно авторизувались!', 'success', 'authSuccess');
            } else {
                // Відображення помилки авторизації
                if (response.status === 400) {
                    addClass('label_auth_login', 'border-error');
                    addClass('label_auth_password', 'border-error');
                    setAuthErrorMessage('Перевірте правильність введених даних: формат логіну та/або паролю недійсний');
                } else if (response.status === 401) {
                    addClass('label_auth_login', 'border-error');
                    addClass('label_auth_password', 'border-error');
                    setAuthErrorMessage('Перевірте правильність введених даних: логін та/або пароль недійсні.');
                } else if (response.status === 409) {
                    addClass('label_auth_login', 'border-error');
                    addClass('label_auth_password', 'border-error');
                    setAuthErrorMessage('Помилка 409. Зверніться до служби підтримки.');
                } else {
                    setAuthErrorMessage(response.message || 'Помилка авторизації.');
                }
            }
        } catch (error) {
            setAuthErrorMessage('Не вдалося підключитися до сервера авторизації. Спробуйте пізніше.');
        }

        removeClass('loginButtonText', ['loading', 'loading-spinner']);
    }

    return(
        <dialog id='auth_modal' className='modal z-40'>
            <div className="modal-box p-0 bg-base-300">
                <div className="grid grid-cols-2">
                    
                    {/* Ліва частина модалки із зображенням */}
                    <div className='max-h-[30rem] overflow-clip flex items-center'><img src="/images/auth_bg.png" alt="auth_bg"/></div>

                    {/* Права частина модалки з формою */}
                    <div className="p-8 flex flex-col gap-2">
                        <div className='flex items-center justify-between'>
                            <div className='text-xl font-bold text-white'>Авторизація</div>
                            <form method="dialog" onSubmit={clearAll}>
                                <button className="btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                            </form>
                        </div>

                        {/* Авторизація через соціалки */}
                        <div className='grid grid-cols-3 gap-2 mt-4'>
                            <button className='btn social-btn'><Steam className='w-[1.5rem] h-[1.5rem] fill-base-content'/></button>
                            <button className='btn social-btn'><Telegram className='w-[1.5rem] h-[1.5rem] fill-base-content'/></button>
                            <button className='btn social-btn'><Google className='w-[1.5rem] h-[1.5rem] fill-base-content'/></button>
                        </div>

                        {/* Форма авторизації */}
                        <label id='label_auth_login' className="input flex items-center gap-2 mt-4">
                            <User className='h-4 w-4 opacity-70 fill-base-content'/>
                            <input id='auth_login' type="text" className="grow" placeholder="Логін" onChange={handleInputChange}/>
                        </label>
                        <label id='label_auth_password' className="input flex items-center gap-2 pr-2 outline-0 ">
                            <Password className='h-4 w-4 [&>*]:fill-base-content'/>
                            <input id='auth_password' type={isPasswordHidden ? 'password' : 'text'} className="grow" placeholder='Пароль' onChange={handleInputChange}/>
                            <button className='w-auto h-full p-2' onClick={() => setIsPasswordHidden(!isPasswordHidden)}>{ isPasswordHidden ? <EyeOpened className='h-4 w-4 [&>*]:fill-base-content'/> : <EyeClosed className='h-4 w-4 [&>*]:fill-base-content'/>}</button>
                        </label>
                        <button className='btn btn-primary mt-4 font-bold' onClick={handleLogin}><span id="loginButtonText">Увійти</span></button>

                        {/* Повідомлення про помилку */}
                        <div className={authErrorMessage ? 'h-[2.5rem] leading-5 text-error flex items-center justify-center text-center' : 'hidden'}>{authErrorMessage}</div>
                        
                        {/* Посилання на відновлення паролю */}
                        <a className={`link link-primary text-center select-none ${authErrorMessage ? 'mt-0' : 'mt-4'}`}>Забули пароль?</a>

                        {/* Переключення на реєстрацію */}
                        <div className={`font-bold text-center ${authErrorMessage ? 'mt-0' : 'mt-8'} select-none`}>Не маєте акаунт? <a className="link link-primary text-center" onClick={handleSwitchAuth}>Створіть</a></div>
                    </div>

                </div>
            </div>
            
            <form method="dialog" className="modal-backdrop" onSubmit={clearAll}>
                <button>close</button>
            </form>
        </dialog>
    )
}