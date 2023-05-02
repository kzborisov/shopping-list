import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, signInWithGoogle } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            navigate('/shopping-list/')
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            console.log(result);
            navigate('/shopping-list/');
        } catch (err) {
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
        console.log('Logging in with', email, password);
        login()
        e.target.email.value = "";
        e.target.psw.value = "";
    }

    return (
        <div className='flex flex-col items-center gap-4'>
            <form
                onSubmit={handleLoginFormSubmit}
                className='flex flex-col justify-start border-2 border-red-400 border-dotted m-4 p-4'>
                <label htmlFor='email' className='text-left my-2'>Email</label>
                <input type='email' placeholder='Enter your email' name='email'
                    onChange={onLoginEmailChange}
                    className='py-1 pl-2 border-2 border-gray-400 border-solid'
                />


                <label htmlFor='psw' className='text-left my-2'>Password</label>
                <input type='password' placeholder='Enter your password' name='psw'
                    onChange={onLoginPasswordChange}
                    className='py-1 pl-2 border-2 border-gray-400 border-solid'
                />

                <button type='submit' className='m-4 p-2 rounded-xl bg-orange-500 text-white font-semibold hover:drop-shadow-md'>Login</button>
            </form>
            <GoogleButton
                type="light"
                onClick={handleGoogleSignIn}
            />
        </div>
    )
}

export default LoginPage