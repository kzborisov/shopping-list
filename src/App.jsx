import { useEffect, useState } from 'react';

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Protected from './components/Protected';
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import PasswordReset from './pages/PasswordReset';

function App() {
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                localStorage.setItem('isSignedIn', true);
            } else {
                localStorage.setItem('isSignedIn', false);
            }
        });
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Protected><HomePage /></Protected>,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/reset-password",
            element: <PasswordReset />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
    ]);

    return (
        // <div className='flex flex-col items-center'>
        <RouterProvider router={router} />
        // </div >
    )
}
;
export default App
