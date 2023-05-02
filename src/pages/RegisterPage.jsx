import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
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
        console.log('Registered in with', email, password);
        e.target.email.value = "";
        e.target.psw.value = "";
        register()
    }

    return (
        <div className='flex'>
            <form
                onSubmit={handleRegisterFormSubmit}
                className='flex flex-col justify-start border-2 border-red-400 border-dotted m-4 p-4'>
                <label htmlFor='email' className='text-left my-2'>Email</label>
                <input type='email' placeholder='Enter your email' name='email'
                    onChange={onRegisterEmailChange}
                    className='py-1 pl-2 border-2 border-gray-400 border-solid'
                />


                <label htmlFor='psw' className='text-left my-2'>Password</label>
                <input type='password' placeholder='Enter your password' name='psw'
                    onChange={onRegisterPasswordChange}
                    className='py-1 pl-2 border-2 border-gray-400 border-solid'
                />

                <button type='submit' className='m-4 p-2 rounded-xl bg-orange-500 text-white font-semibold hover:drop-shadow-md'>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage