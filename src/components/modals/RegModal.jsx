import React, { useState } from 'react';
import { Password, User, EyeClosed, EyeOpened, Email, ArrowRight } from '../svg/Icons';
import { api_signup } from '../../scripts/api';
import { useAlert } from '../../context/AlertContext';

export default function RegModal() {

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [regStep, setRegStep] = useState(1);
    const [regErrorMessage, setRegErrorMessage] = useState('');

    const { showAlert } = useAlert();

    const handleSwitchAuth = () => {
        setRegStep(1);
        document.getElementById('reg_modal').close();
        document.getElementById('auth_modal').showModal();
    }

    const clearAll = () => {
        setRegStep(1);
        setRegErrorMessage('');
        document.getElementById('reg_login').value = '';
        document.getElementById('reg_email').value = '';
        document.getElementById('reg_password').value = '';
        document.getElementById('reg_password2').value = '';
        document.getElementById('reg_firstName').value = '';
        document.getElementById('reg_lastName').value = '';
        document.getElementById('reg_nickName').value = '';
        document.getElementById('label_reg_login').classList.remove('border-error');
        document.getElementById('label_reg_email').classList.remove('border-error');
        document.getElementById('label_reg_password').classList.remove('border-error');
        document.getElementById('label_reg_password2').classList.remove('border-error');
        document.getElementById('label_reg_firstName').classList.remove('border-error');
        document.getElementById('label_reg_lastName').classList.remove('border-error');
        document.getElementById('label_reg_nickName').classList.remove('border-error');
    }

    const handleInputChange = () => {
        setRegErrorMessage('');
        document.getElementById('label_reg_login').classList.remove('border-error');
        document.getElementById('label_reg_email').classList.remove('border-error');
        document.getElementById('label_reg_password').classList.remove('border-error');
        document.getElementById('label_reg_password2').classList.remove('border-error');
        document.getElementById('label_reg_firstName').classList.remove('border-error');
        document.getElementById('label_reg_lastName').classList.remove('border-error');
        document.getElementById('label_reg_nickName').classList.remove('border-error');
    }

    const handleSignup = async () => {
        document.getElementById('signupButtonText').classList.add('loading', 'loading-spinner');

        const login = document.getElementById('reg_login').value;
        const email = document.getElementById('reg_email').value;
        const password = document.getElementById('reg_password').value;
        const firstName = document.getElementById('reg_firstName').value;
        const lastName = document.getElementById('reg_lastName').value;
        const nickName = document.getElementById('reg_nickName').value;

        if (!firstName || !lastName || !nickName) {
            setRegErrorMessage('Введіть, будь ласка, свої дані.');
            document.getElementById('label_reg_firstName').classList.add('border-error');
            document.getElementById('label_reg_lastName').classList.add('border-error');
            document.getElementById('label_reg_nickName').classList.add('border-error');
            document.getElementById('signupButtonText').classList.remove('loading', 'loading-spinner');
        }

        setRegErrorMessage('');

        try {
            const response = await api_signup(login, email, password, firstName, lastName, nickName);

            if (response.status === 201) {
                // Дії після успішного логіну (можливо, редірект або закриття модалки)
                document.getElementById('signupButtonText').classList.remove('loading', 'loading-spinner');
                document.getElementById('reg_modal').close();
                document.getElementById('auth_modal').showModal();
                clearAll();
                showAlert('Ваш обліковий запис було створено. Тепер Ви можете авторизуватись.', 'success', 'authSuccess');
            } else {
                // Відображення помилки реєстрації
                if (response.status === 400) {
                    document.getElementById('label_reg_login').classList.add('border-error');
                    document.getElementById('label_reg_email').classList.add('border-error');
                    document.getElementById('label_reg_password').classList.add('border-error');
                    document.getElementById('label_reg_password2').classList.add('border-error');
                    document.getElementById('label_reg_firstName').classList.add('border-error');
                    document.getElementById('label_reg_lastName').classList.add('border-error');
                    document.getElementById('label_reg_nickName').classList.add('border-error');
                    setRegErrorMessage('Перевірте правильність введених даних: формат даних недійсний.');
                } else if (response.status === 409) {
                    setRegStep(1);
                    document.getElementById('label_reg_login').classList.add('border-error');
                    document.getElementById('label_reg_email').classList.add('border-error');
                    setRegErrorMessage('Користувач з таким логіном або імейлом вже зареєстрований.');

                } else {
                    setRegErrorMessage(response.message || 'Помилка реєстрації.');
                }
                
            }
        } catch (error) {
            setRegErrorMessage('Не вдалося підключитися до сервера авторизації. Спробуйте пізніше.');
        }

        document.getElementById('signupButtonText').classList.remove('loading', 'loading-spinner');
    }

    const handleChangeStep = (step) => {
        if (step === 2) {
            const login = document.getElementById('reg_login').value;
            const email = document.getElementById('reg_email').value;
            const password = document.getElementById('reg_password').value;
            const password2 = document.getElementById('reg_password2').value;
    
            if (!login || !email || !password || !password2) {
                setRegErrorMessage('Всі поля мають бути заповнені');
                document.getElementById('label_reg_login').classList.add('border-error');
                document.getElementById('label_reg_email').classList.add('border-error');
                document.getElementById('label_reg_password').classList.add('border-error');
                document.getElementById('label_reg_password2').classList.add('border-error');
                return;
            }
    
            if (password !== password2) {
                setRegErrorMessage('Паролі не збігаються');
                document.getElementById('label_reg_password').classList.add('border-error');
                document.getElementById('label_reg_password2').classList.add('border-error');
                return;
            }
    
            if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || (password.match(/\d/g) || []).length < 2) {
                setRegErrorMessage('Пароль має містити мінімум 8 символів: заглавні та маленькі латинські літери та цифри');
                document.getElementById('label_reg_password').classList.add('border-error');
                document.getElementById('label_reg_password2').classList.add('border-error');
                return;
            }

            setRegStep(2);
        } else if (step === 1) {
            setRegStep(1);
        }
    }

    return (
        <dialog id='reg_modal' className='modal'>
            <div className='modal-box p-0 bg-base-300'>
                <div className='grid grid-cols-2'>

                    {/* Ліва частина модалки із зображенням */}
                    <div className='max-h-[30rem] overflow-clip flex items-center'>
                        <img src='/images/auth_bg.png' alt='auth_bg'/>
                    </div>

                    {/* Права частина модалки з формою */}
                    <div className={`pt-8 ${regErrorMessage ? 'pb-4' : 'pb-8'} flex flex-col gap-2 w-full`}>

                        <div className='flex items-center justify-between px-8'>
                            <div className='text-xl font-bold text-white'>Реєстрація</div>
                            <form method='dialog' onSubmit={clearAll}>
                                <button className='btn btn-sm btn-circle btn-ghost right-2 top-2'>✕</button>
                            </form>
                        </div>

                        {/* Контейнер для двох div з анімаціями */}
                        <div className='relative overflow-hidden h-full mt-4'>
                            {/* Перший div */}
                            <div className={`absolute top-0 left-0 w-[95%] pl-8 transition-transform duration-500 ${regStep === 1 ? 'translate-x-0' : '-translate-x-full'} ease-in-out`} style={{paddingRight: '1rem'}}>
                                <div className='flex flex-col gap-2'>
                                    <label id='label_reg_login' className='input flex items-center gap-2'>
                                        <User className='h-4 w-4 opacity-70 fill-base-content'/>
                                        <input id='reg_login' type='text' className='grow' placeholder='Логін' onChange={handleInputChange}/>
                                    </label>
                                    <label id='label_reg_email' className='input flex items-center gap-2'>
                                        <Email className='h-4 w-4 opacity-70 fill-base-content'/>
                                        <input id='reg_email' type='text' className='grow' placeholder='Email' onChange={handleInputChange}/>
                                    </label>
                                    <label id='label_reg_password' className='input flex items-center gap-2 pr-2 outline-0'>
                                        <Password className='h-4 w-4 [&>*]:fill-base-content'/>
                                        <input id='reg_password' type={isPasswordHidden ? 'password' : 'text'} className='grow' placeholder='Пароль' onChange={handleInputChange}/>
                                        <button className='w-auto h-full p-2' onClick={() => setIsPasswordHidden(!isPasswordHidden)}>{ isPasswordHidden ? <EyeOpened className='h-4 w-4 [&>*]:fill-base-content'/> : <EyeClosed className='h-4 w-4 [&>*]:fill-base-content'/>}</button>
                                    </label>
                                    <label id='label_reg_password2' className='input flex items-center gap-2 pr-2 outline-0'>
                                        <Password className='h-4 w-4 [&>*]:fill-base-content'/>
                                        <input id='reg_password2' type={isPasswordHidden ? 'password' : 'text'} className='grow' placeholder='Повторіть пароль' onChange={handleInputChange}/>
                                        <button className='w-auto h-full p-2' onClick={() => setIsPasswordHidden(!isPasswordHidden)}>{ isPasswordHidden ? <EyeOpened className='h-4 w-4 [&>*]:fill-base-content'/> : <EyeClosed className='h-4 w-4 [&>*]:fill-base-content'/>}</button>
                                    </label>

                                    <button className='btn btn-primary mt-4 font-bold gap-0' onClick={() => handleChangeStep(2)}>Продовжити <ArrowRight className='h-6 w-6 [&>*]:stroke-base-content'/></button>
                                </div>
                            </div>

                            {/* Другий div */}
                            <div className={`absolute top-0 left-full w-full px-8 transition-transform duration-500 ${regStep === 2 ? '-translate-x-full' : 'translate-x-0'}`}>
                                <div className='flex flex-col gap-2'>
                                    <label id='label_reg_firstName' className='input flex items-center gap-2'>
                                        <User className='h-4 w-4 opacity-70 fill-base-content'/>
                                        <input id='reg_firstName' type='text' className='grow' placeholder="Ім'я" />
                                    </label>
                                    <label id='label_reg_lastName' className='input flex items-center gap-2'>
                                        <User className='h-4 w-4 opacity-70 fill-base-content'/>
                                        <input id='reg_lastName' type='text' className='grow' placeholder='Прізвище' />
                                    </label>
                                    <label id='label_reg_nickName' className='input flex items-center gap-2'>
                                        <User className='h-4 w-4 opacity-70 fill-base-content'/>
                                        <input id='reg_nickName' type='text' className='grow' placeholder='Нікнейм' />
                                    </label>

                                    <button className='btn btn-primary mt-4 font-bold' onClick={handleSignup}><span id="signupButtonText">Зареєструватись</span></button>
                                    <button className='btn bg-base-100 hover:bg-base-100/70 font-bold gap-0' onClick={() => handleChangeStep(1)}><ArrowRight className='h-6 w-6 [&>*]:stroke-base-content rotate-180'/>Повернутись</button>
                                </div>
                            </div>
                        </div>

                        {/* Повідомлення про помилку */}
                        <div className={regErrorMessage ? 'h-[2.5rem] leading-5 text-error flex items-center justify-center text-center' : 'hidden'}>{regErrorMessage}</div>

                        {/* Переключення на авторизацію */}
                        <div className={`font-bold text-center ${regErrorMessage ? 'mt-0' : 'mt-8'} select-none`}>Вже маєте акаунт? <a className='link link-primary text-center' onClick={handleSwitchAuth}>Увійдіть</a></div>

                    </div>

                </div>
            </div>

            <form method='dialog' className='modal-backdrop' onSubmit={clearAll}>
                <button>close</button>
            </form>
        </dialog>
    )
}