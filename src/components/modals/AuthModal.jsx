import React, { useState } from 'react';
import { EyeClosed, EyeOpened, Google, Password, Steam, Telegram, User } from '../svg/Icons';
import { api_login } from '../../scripts/api';
import { useAlert } from '../../context/AlertContext';

export default function AuthModal() {

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [authErrorMessage, setAuthErrorMessage] = useState('');
    
    const { showAlert } = useAlert();

    const handleSwitchAuth = () => {
        clearAll();
        document.getElementById('auth_modal').close();
        document.getElementById('reg_modal').showModal();
    }

    const clearAll = () => {
        setAuthErrorMessage('');
        document.getElementById('auth_login').value = '';
        document.getElementById('auth_password').value = '';
        document.getElementById('label_auth_login').classList.remove('border-error');
        document.getElementById('label_auth_password').classList.remove('border-error');
    }

    const handleInputChange = () => {
        setAuthErrorMessage('');
        document.getElementById('label_auth_login').classList.remove('border-error');
        document.getElementById('label_auth_password').classList.remove('border-error');
    }

    const handleLogin = async () => {
        document.getElementById('loginButtonText').classList.add('loading', 'loading-spinner');

        const login = document.getElementById('auth_login').value;
        const password = document.getElementById('auth_password').value;

        if (!login || !password) {
            setAuthErrorMessage('Введіть, будь ласка, свої дані.');
            document.getElementById('label_auth_login').classList.add('border-error');
            document.getElementById('label_auth_password').classList.add('border-error');
            document.getElementById('loginButtonText').classList.remove('loading', 'loading-spinner');
            return;
        }

        setAuthErrorMessage('');

        try {
            const response = await api_login(login, password);

            if (response.status === 200) {
                // Дії після успішного логіну (можливо, редірект або закриття модалки)
                document.getElementById('loginButtonText').classList.remove('loading', 'loading-spinner');
                // document.getElementById('auth_modal').close();
                // clearAll();
                showAlert('Ви успішно авторизувались!', 'success', 'authSuccess');
            } else {
                // Відображення помилки авторизації
                if (response.status === 400) {
                    document.getElementById('label_auth_login').classList.add('border-error');
                    document.getElementById('label_auth_password').classList.add('border-error');
                    setAuthErrorMessage('Перевірте правильність введених даних: формат логіну та/або паролю недійсний');
                } else if (response.status === 401) {
                    document.getElementById('label_auth_login').classList.add('border-error');
                    document.getElementById('label_auth_password').classList.add('border-error');
                    setAuthErrorMessage('Перевірте правильність введених даних: логін та/або пароль недійсні.');
                } else if (response.status === 409) {
                    document.getElementById('label_auth_login').classList.add('border-error');
                    document.getElementById('label_auth_password').classList.add('border-error');
                    setAuthErrorMessage('Помилка 409. Зверніться до служби підтримки.');
                } else {
                    setAuthErrorMessage(response.message || 'Помилка авторизації.');
                }
                
            }
        } catch (error) {
            setAuthErrorMessage('Не вдалося підключитися до сервера авторизації. Спробуйте пізніше.');
        }

        document.getElementById('loginButtonText').classList.remove('loading', 'loading-spinner');
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