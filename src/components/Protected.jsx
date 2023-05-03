import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
    const isSignedIn = localStorage.getItem('isSignedIn');
    if (isSignedIn === "false") {
        return <Navigate to='/shopping-list/login/' replace />
    }
    return children
}

export default Protected