import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, signInWithGoogle } from '../firebase-config'
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';


const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/shopping-list/')
        } catch (err) {
            console.log(err.message);
        }
    }

    const onRegisterEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onRegisterPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleRegisterFormSubmit = (e) => {
        e.preventDefault();
        e.target.email.value = "";
        e.target.psw.value = "";
        register()
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            localStorage.setItem('isSignedIn', true);
            navigate('/shopping-list/');
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className='flex flex-col items-center gap-4'>
            <h2 className='text-3xl font-bold my-4 text-gray-600'>Register</h2>
            <form
                onSubmit={handleRegisterFormSubmit}
                className='flex flex-col justify-start m-4 p-4'>
                <label htmlFor='email' className='text-left my-2 text-gray-600 font-medium'>Email</label>
                <input type='email' placeholder='Enter your email' name='email'
                    onChange={onRegisterEmailChange}
                    className='py-1 pl-2 border-b-2 border-gray-300 border-solid focus:border-b-orange-400 focus:outline-none'
                />

                <label htmlFor='psw' className='text-left my-2 text-gray-600 font-medium'>Password</label>
                <input type='password' placeholder='Enter your password' name='psw'
                    onChange={onRegisterPasswordChange}
                    className='py-1 pl-2 border-b-2 border-gray-300 border-solid focus:border-b-orange-400 focus:outline-none'
                />

                <p className='text-sm mt-2 text-right text-gray-600 font-medium cursor-pointer hover:drop-shadow-md tracking-[.05rem]'>
                    <Link to="/shopping-list/login">Already have an account?</Link>
                </p>

                <button type='submit' className='mt-6 p-2 rounded-xl bg-orange-500 text-white font-semibold hover:drop-shadow-md'>Login</button>
            </form>



            <p className='text-sm mt-2 text-right text-gray-600 font-medium tracking-[.05rem]'>Or Sign Up Using</p>
            <span className='cursor-pointer hover:drop-shadow-md' onClick={handleGoogleSignIn}>
                <FcGoogle size={50} />
            </span>
        </div>
    )
}

export default RegisterPage