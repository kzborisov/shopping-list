import React, { useState } from 'react'
import { auth, signInWithGoogle } from '../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { sendPasswordResetEmail } from 'firebase/auth';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const triggerResetEmail = async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, email);
        console.log('email send');
        e.target.email.value = ""
        navigate('/shopping-list/');
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            localStorage.setItem('isSignedIn', true);
            navigate('/shopping-list/');
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className='flex flex-col items-center gap-4 p-4 min-w-[350px] md:w-[550px] lg:w-[350px] mx-auto'>
            <h2 className='text-3xl font-bold my-4 text-gray-600'>Reset Password</h2>
            <form
                onSubmit={triggerResetEmail}
                className='flex flex-col justify-start m-4 p-4 w-full'>
                <label htmlFor='email' className='text-left my-2 text-gray-600 font-medium'>Email</label>
                <input type='email' placeholder='Enter your email' name='email'
                    onChange={onEmailChange}
                    className='py-1 pl-2 border-b-2 border-gray-300 border-solid focus:border-b-orange-400 focus:outline-none'
                />
                <p className='text-sm mt-2 text-right text-gray-600 font-medium cursor-pointer hover:drop-shadow-md tracking-[.05rem]'>
                    <Link to="/shopping-list/login/">Log In?</Link>
                </p>

                <button type='submit' className='mt-6 p-2 rounded-xl bg-orange-500 text-white font-semibold hover:drop-shadow-md'>Reset Password</button>
            </form>



            <p className='text-sm mt-2 text-right text-gray-600 font-medium tracking-[.05rem]'>Or Sign Up Using</p>
            <span className='cursor-pointer hover:drop-shadow-md' onClick={handleGoogleSignIn}>
                <FcGoogle size={50} />
            </span>
        </div>
    )
}

export default PasswordReset
