import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, signInWithGoogle } from '../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('isSignedIn', true);
            navigate('/shopping-list/')
        } catch (err) {
            console.log(err.message);
            alert(err.message);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            localStorage.setItem('isSignedIn', true);
            navigate('/shopping-list/');
        } catch (err) {
            alert(err.message)
            console.log(err.message);
        }
    }

    const onLoginEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onLoginPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        login()
        e.target.email.value = "";
        e.target.psw.value = "";
    }

    return (
        <div className='flex flex-col items-center gap-4'>
            <h2 className='text-3xl font-bold my-4 text-gray-600'>Login</h2>
            <form
                onSubmit={handleLoginFormSubmit}
                className='flex flex-col justify-start m-4 p-4 w-full'>
                <label htmlFor='email' className='text-left my-2 text-gray-600 font-medium'>Email</label>
                <input type='email' placeholder='Enter your email' name='email'
                    onChange={onLoginEmailChange}
                    className='py-1 pl-2 border-b-2 border-gray-300 border-solid focus:border-b-orange-400 focus:outline-none'
                />


                <label htmlFor='psw' className='text-left my-2 text-gray-600 font-medium'>Password</label>
                <input type='password' placeholder='Enter your password' name='psw'
                    onChange={onLoginPasswordChange}
                    className='py-1 pl-2 border-b-2 border-gray-300 border-solid focus:border-b-orange-400 focus:outline-none'
                />

                <p className='text-sm mt-2 text-right text-gray-600 font-medium cursor-pointer hover:drop-shadow-md tracking-[.05rem]'>
                    <Link to="/shopping-list/reset-password/">Forgot password?</Link>
                </p>

                <button type='submit' className='mt-6 p-2 rounded-xl bg-orange-500 text-white font-semibold hover:drop-shadow-md'>Login</button>
            </form>

            <p className='text-sm mt-2 text-right text-gray-600 font-medium tracking-[.05rem]'>Or Sign Up Using</p>
            <span className='cursor-pointer hover:drop-shadow-md' onClick={handleGoogleSignIn}>
                <FcGoogle size={50} />
            </span>

            <div className='absolute bottom-10 md:relative md:bottom-0 flex flex-col gap-1'>
                <p className='text-sm text-right text-gray-600 font-medium tracking-[.05rem]'>Or Sign Up Using</p>
                <Link to="/shopping-list/register/" className='cursor-pointer hover:drop-shadow-md'>SIGN UP</Link>
            </div>

        </div>
    )
}

export default LoginPage